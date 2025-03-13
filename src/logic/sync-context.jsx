import React, { createContext, useContext, useEffect, useState } from 'react'
import { Peer } from 'peerjs'

import deepMerge from 'deepmerge'

// Context Setup
const WebSocketContext = createContext(null)

// Custom Hook
export const useSyncedContext = () => useContext(WebSocketContext)

// Provider Component
export const SyncedContextProvider = ({ children, knownTypes }) => {
  const [peer, setPeer] = useState(null)
  const [conn, setConn] = useState(null)
  const [peerId, setPeerId] = useState(null)
  const [state, updateState] = useState({}) // Shared game state
  const [isHost, setIsHost] = useState(false)

  useEffect(() => {
    // Initialize PeerJS
    const newPeer = new Peer(generateShortId())
    setPeer(newPeer)

    newPeer.on('open', (id) => {
      console.log('My peer ID:', id)
      setPeerId(id)
    })

    // Handle incoming connections
    newPeer.on('connection', (connection) => {
      console.log('Incoming connection:', connection)
      setupConnection(connection)
      setIsHost(false)
    })

    return () => newPeer.destroy() // Cleanup on unmount
  }, [])

  const setupConnection = (connection) => {
    setConn(connection)

    connection.on('data', (data) => {
      console.log('Received:', data)
      updateState((prev) => deepMerge(prev, data))
    })

    connection.on('close', () => console.log('Connection closed'))
  }

  // Connect to a peer
  const connectToPeer = (peerId) => {
    if (peer) {
      const connection = peer.connect(peerId)
      connection.on('open', () => {
        console.log('Connected to:', peerId)
        setupConnection(connection)
        setIsHost(true)
      })
    }
  }

  // Send game state updates
  const sendUpdate = (state) => {
    updateState(state)
    if (conn) setTimeout(() => conn.send(state), 0)
  }

  return (
    <WebSocketContext.Provider value={{ peerId, connectToPeer, state, sendUpdate, connected: Boolean(conn), isHost }}>
      {children}
    </WebSocketContext.Provider>
  )
}

const generateShortId = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase() // 6-character random ID
}