"use client";

import { truncateAddress } from "@/lib/contract";

type TransactionRowProps = {
  address: string;
  timestamp: number;
  label?: string;
};

export default function TransactionRow({ address, timestamp, label = "Transfer" }: TransactionRowProps) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/8 py-4 transition-colors duration-200 last:border-b-0 hover:border-white/12 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">{label}</p>
        <p className="truncate text-sm text-zinc-400">{truncateAddress(address)}</p>
      </div>
      <p className="text-right text-xs text-zinc-400 sm:text-sm">
        {new Date(timestamp * 1000).toLocaleString()}
      </p>
      <p className="hidden text-sm font-bold uppercase tracking-[0.18em] text-zinc-500 sm:block">Encrypted</p>
    </div>
  );
}
