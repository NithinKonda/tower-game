import React from 'react'
import Link from 'next/link'

const Lobby = () => {
  return (
    <div>
        <Link href="/game">Play</Link>
        <p>THIS IS LOBBY</p>
    </div>
  )
}

export default Lobby