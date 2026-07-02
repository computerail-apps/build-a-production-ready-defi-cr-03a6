import React, { useEffect, useState } from 'react';
import { TOKENS, getPrice } from '../lib/prices';

export default function Ticker() {
  const [prices, setPrices] = useState<Record<string, number>>({});
  useEffect(() => {
    const update = () => {
      const p: Record<string, number> = {};
      TOKENS.forEach(t => { p[t] = getPrice(t); });
      setPrices(p);
    };
    update();
    const id = setInterval(update, 3000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="overflow-hidden bg-gray-900/60 border-b border-purple-900/30 py-2">
      <div className="flex gap-8 animate-marquee whitespace-nowrap px-4">
        {[...TOKENS, ...TOKENS].map((t, i) => (
          <span key={i} className="text-sm">
            <span className="text-gray-400">{t}/USD</span>
            <span className="ml-2 text-green-400 font-semibold">${prices[t]?.toLocaleString()}</span>
          </span>
        ))}
      </div>
    </div>
  );
}