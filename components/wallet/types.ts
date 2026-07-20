export type Transaction = {
  id: string;
  label: string;
  date: string;
  /** Positive for money in (top-ups, rewards), negative for money out (plan renewals). */
  amount: number;
};

export const INITIAL_BALANCE = 250;

export const DUMMY_TRANSACTIONS: Transaction[] = [
  { id: "t1", label: "Chill plan renewal", date: "18 Jul", amount: -500 },
  { id: "t2", label: "Wallet top-up via Mpesa", date: "15 Jul", amount: 1000 },
  { id: "t3", label: "Referral reward — Brayo joined", date: "10 Jul", amount: 100 },
  { id: "t4", label: "Fast plan renewal", date: "3 Jul", amount: -1000 },
];

export const TOPUP_AMOUNTS = [100, 250, 500, 1000];

export type StatEntry = {
  label: string;
  value: string;
};

export const WALLET_STATS: StatEntry[] = [
  { label: "Days Connected", value: "87" },
  { label: "Total Saved", value: "KES 3,400" },
  { label: "Referrals Secured", value: "12" },
];
