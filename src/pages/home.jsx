
import React, { useState } from 'react'
import { useSyncedContext } from '../logic/sync-context'

export default function Home() {
  const { peerId, connectToPeer } = useSyncedContext()
  const [peerIdInput, setPeerIdInput] = useState('')

  return <div className="home">
    <div className='peer-id'>{peerId}</div>
    <h1>[...]</h1>
    <input placeholder='Peer ID' value={peerIdInput} onChange={(e) => setPeerIdInput(e.target.value)} />
    <button onClick={() => connectToPeer(peerIdInput)}>
      Connect
    </button>
  </div>
}