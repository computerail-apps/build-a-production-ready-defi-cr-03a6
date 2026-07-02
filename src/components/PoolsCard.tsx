import React from 'react';

const POOLS = [
  { pair: 'ETH/USDC', tvl: '$124.5M', apy: '12.4%', vol: '$8.2M' },
  { pair: 'BTC/ETH',  tvl: '$98.1M',  apy: '9.1%',  vol: '$5.7M' },
  { pair: 'SOL/USDC', tvl: '$45.3M',  apy: '18.7%', vol: '$3.1M' },
  { pair: 'AVAX/ETH', tvl: '$22.8M',  apy: '22.3%', vol: '$1.9M' },
];

export default function PoolsCard() {
  return (
    <div className="bg-gray-900 border border-purple-800/50 rounded-2xl p-6 w-full">
      <h2 className="text-lg font-bold mb-4">Top Liquidity Pools</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-gray-400 border-b border-gray-800">
            {['Pair','TVL','APY','24h Vol','Action'].map(h => <th key={h} className="text-left py-2 pr-4">{h}</th>)}
          </tr></thead>
          <tbody>
            {POOLS.map(p => (
              <tr key={p.pair} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition">
                <td className="py-3 pr-4 font-semibold">{p.pair}</td>
                <td className="py-3 pr-4 text-cyan-400">{p.tvl}</td>
                <td className="py-3 pr-4 text-green-400">{p.apy}</td>
                <td className="py-3 pr-4 text-gray-300">{p.vol}</td>
                <td className="py-3">
                  <button className="gradient-btn px-3 py-1 rounded-lg text-xs font-semibold">Add Liquidity</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}