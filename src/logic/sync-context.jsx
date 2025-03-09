import React, { createContext, useContext, useEffect, useState, useRef } from 'react'
import { Peer } from 'peerjs'

// Context Setup
const WebSocketContext = createContext(null)

// Custom Hook
export const useSyncedContext = () => useContext(WebSocketContext)

// Provider Component
export const SyncedContextProvider = ({ children }) => {
  const [peer, setPeer] = useState(null)
  const [conn, setConn] = useState(null)
  const [peerId, setPeerId] = useState(null)
  const [gameState, setGameState] = useState({}) // Shared game state
  const isHost = useRef(false)

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
      isHost.current = true // First connected player is host
      setupConnection(connection)
    })

    return () => newPeer.destroy() // Cleanup on unmount
  }, [])

  const setupConnection = (connection) => {
    setConn(connection)

    connection.on('data', (data) => {
      console.log('Received:', data)
      setGameState((prev) => ({ ...prev, ...data }))
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
      })
    }
  }

  // Send game state updates
  const sendUpdate = (update) => {
    setGameState((prev) => ({ ...prev, ...update }))
    if (conn) conn.send(update)
  }

  return (
    <WebSocketContext.Provider value={{ peerId, connectToPeer, gameState, sendUpdate, isHost: isHost.current }}>
      {children}
    </WebSocketContext.Provider>
  )
}

const generateShortId = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();  // 6-character random ID
}
