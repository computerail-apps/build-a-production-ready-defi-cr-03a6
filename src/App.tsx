import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Ticker from './components/Ticker';
import SwapCard from './components/SwapCard';
import PoolsCard from './components/PoolsCard';
import TradeHistory from './components/TradeHistory';

export default function App() {
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <Ticker />
      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">The Future of DeFi</h1>
          <p className="text-gray-400 mt-2">Swap tokens instantly with the lowest fees on-chain.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          <SwapCard onSwap={() => setRefresh(r => r + 1)} />
          <div className="flex-1 space-y-6 w-full">
            <PoolsCard />
            <TradeHistory refresh={refresh} />
          </div>
        </div>
      </main>
      <footer className="text-center text-gray-600 text-xs py-6">© 2024 VibeSwap — Powered by ComputeRail</footer>
    </div>
  );
}