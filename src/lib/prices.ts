export const TOKENS = ['ETH', 'BTC', 'SOL', 'AVAX', 'MATIC', 'LINK', 'UNI', 'USDC'];

const BASE: Record<string, number> = {
  ETH: 3420, BTC: 67800, SOL: 178, AVAX: 38,
  MATIC: 0.92, LINK: 18.4, UNI: 11.2, USDC: 1,
};

export function getPrice(token: string): number {
  const base = BASE[token] ?? 1;
  const jitter = 1 + (Math.random() - 0.5) * 0.004;
  return parseFloat((base * jitter).toFixed(4));
}

export function calcSwap(from: string, to: string, amount: number) {
  const fromUSD = getPrice(from) * amount;
  const toPrice = getPrice(to);
  const fee = 0.003;
  const received = (fromUSD / toPrice) * (1 - fee);
  return { received: parseFloat(received.toFixed(6)), price: toPrice, fee };
}