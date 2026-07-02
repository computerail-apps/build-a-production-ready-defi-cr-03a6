import React, { useEffect, useState } from 'react';
import { getTrades, Trade } from '../lib/supabase';

export default function TradeHistory({ refresh }: { refresh: number }) {
  const [trades, setTrades] = useState<Trade[]>([]);
  useEffect(() => {
    getTrades().then(d => d && setTrades(d));
  }, [refresh]);
  return (
    <div className="bg-gray-900 border border-purple-800/50 rounded-2xl p-6 w-full">
      <h2 className="text-lg font-bold mb-4">Recent Trades</h2>
      {trades.length === 0 ? (
        <p className="text-gray-500 text-sm">No trades yet. Make your first swap!</p>
      ) : (
        <div className="space-y-2">
          {trades.map((t, i) => (
            <div key={i} className="flex justify-between items-center bg-gray-800/50 rounded-xl px-4 py-3 text-sm">
              <span className="font-semibold">{t.amount} {t.from_token} → {t.received} {t.to_token}</span>
              <span className="text-gray-400 text-xs">{t.created_at ? new Date(t.created_at).toLocaleTimeString() : 'just now'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}