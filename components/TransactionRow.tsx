"use client";

import { truncateAddress } from "@/lib/contract";

type TransactionRowProps = {
  address: string;
  timestamp: number;
  label?: string;
};

export default function TransactionRow({ address, timestamp, label = "Transfer" }: TransactionRowProps) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-3 border-b border-white/8 py-4 last:border-b-0 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-4">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">{label}</p>
        <p className="truncate text-sm text-zinc-400">{truncateAddress(address)}</p>
      </div>
      <p className="text-right text-xs text-zinc-400 sm:text-sm">
        {new Date(timestamp * 1000).toLocaleString()}
      </p>
      <p className="hidden font-black text-white sm:block">{`\u2022\u2022\u2022\u2022`}</p>
    </div>
  );
}
