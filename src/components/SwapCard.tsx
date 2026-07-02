import React, { useState } from 'react';
import { TOKENS, calcSwap } from '../lib/prices';
import { saveTrade } from '../lib/supabase';

export default function SwapCard({ onSwap }: { onSwap: () => void }) {
  const [from, setFrom] = useState('ETH');
  const [to, setTo] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [preview, setPreview] = useState<{ received: number; price: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePreview = () => {
    if (!amount || isNaN(+amount)) return;
    setPreview(calcSwap(from, to, +amount));
  };

  const handleSwap = async () => {
    if (!preview || !amount) return;
    setLoading(true);
    await saveTrade({ from_token: from, to_token: to, amount: +amount, received: preview.received, price: preview.price });
    setLoading(false);
    setAmount('');
    setPreview(null);
    onSwap();
  };

  return (
    <div className="bg-gray-900 border border-purple-800/50 rounded-2xl p-6 w-full max-w-md neon-border">
      <h2 className="text-lg font-bold mb-4">Swap Tokens</h2>
      <div className="space-y-3">
        <div className="flex gap-2">
          <select value={from} onChange={e => setFrom(e.target.value)} className="bg-gray-800 rounded-xl px-3 py-2 text-sm border border-gray-700">
            {TOKENS.map(t => <option key={t}>{t}</option>)}
          </select>
          <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)}
            className="flex-1 bg-gray-800 rounded-xl px-3 py-2 text-sm border border-gray-700 outline-none focus:border-purple-500" />
        </div>
        <div className="flex justify-center"><span className="text-2xl text-purple-400">⇅</span></div>
        <select value={to} onChange={e => setTo(e.target.value)} className="w-full bg-gray-800 rounded-xl px-3 py-2 text-sm border border-gray-700">
          {TOKENS.filter(t => t !== from).map(t => <option key={t}>{t}</option>)}
        </select>
        {preview && (
          <div className="bg-gray-800/60 rounded-xl p-3 text-sm space-y-1">
            <div className="flex justify-between"><span className="text-gray-400">You receive</span><span className="text-green-400 font-semibold">{preview.received} {to}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Rate</span><span>${preview.price.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Fee</span><span>0.3%</span></div>
          </div>
        )}
        <button onClick={preview ? handleSwap : handlePreview} disabled={loading}
          className="w-full gradient-btn py-3 rounded-xl font-semibold text-white transition disabled:opacity-50">
          {loading ? 'Confirming...' : preview ? 'Confirm Swap' : 'Preview Swap'}
        </button>
      </div>
    </div>
  );
}