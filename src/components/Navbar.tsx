import React, { useState } from 'react';

export default function Navbar() {
  const [connected, setConnected] = useState(false);
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-purple-900/40 bg-gray-950/80 backdrop-blur sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        <span className="font-bold text-xl bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">VibeSwap</span>
      </div>
      <div className="hidden md:flex gap-6 text-sm text-gray-400">
        {['Swap','Pools','Analytics','Bridge'].map(t => (
          <button key={t} className="hover:text-white transition">{t}</button>
        ))}
      </div>
      <button
        onClick={() => setConnected(!connected)}
        className={`px-4 py-2 rounded-xl text-sm font-semibold transition border ${
          connected ? 'border-green-500 text-green-400 neon-green' : 'gradient-btn text-white border-transparent'
        }`}
      >
        {connected ? '0x3f...a9b2' : 'Connect Wallet'}
      </button>
    </nav>
  );
}