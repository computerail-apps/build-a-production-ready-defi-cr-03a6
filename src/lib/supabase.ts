import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, key);

export interface Trade {
  id?: string;
  from_token: string;
  to_token: string;
  amount: number;
  received: number;
  price: number;
  created_at?: string;
}

export async function saveTrade(trade: Trade) {
  const { data, error } = await supabase.from('trades').insert([trade]).select();
  if (error) console.error(error);
  return data;
}

export async function getTrades() {
  const { data, error } = await supabase
    .from('trades')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
  if (error) console.error(error);
  return data as Trade[];
}