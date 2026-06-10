"use client";

import { BrowserProvider, EventLog } from "ethers";
import { useEffect, useState } from "react";
import { getZamapayContract } from "@/lib/contract";
import TransactionRow from "@/components/TransactionRow";

type ActivityItem = {
  id: string;
  address: string;
  timestamp: number;
  label: string;
};

export default function ActivityList() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    let active = true;

    async function loadActivity() {
      if (!window.ethereum) {
        if (active) {
          setActivity([]);
        }
        return;
      }

      try {
        const accounts = (await window.ethereum.request({ method: "eth_accounts" })) as string[];
        const userAddress = accounts[0];

        if (!userAddress) {
          if (active) {
            setActivity([]);
          }
          return;
        }

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner(userAddress);
        const contract = getZamapayContract(signer);
        const events = await Promise.all([
          contract.queryFilter(contract.filters.Transfer(userAddress, null)),
          contract.queryFilter(contract.filters.Transfer(null, userAddress)),
          contract.queryFilter(contract.filters.TransferWithReceipt(userAddress, null, null)),
          contract.queryFilter(contract.filters.TransferWithReceipt(null, userAddress, null)),
        ]);

        const uniqueEvents = Array.from(
          new Map(
            events
              .flat()
              .filter((event): event is EventLog => "args" in event)
              .map((event) => [`${event.transactionHash}-${event.index}`, event])
          ).values()
        );

        const rows = await Promise.all(
          uniqueEvents.map(async (event) => {
            const block = await provider.getBlock(event.blockNumber);
            const from = String(event.args.from ?? event.args.sender);
            const to = String(event.args.to ?? event.args.receiver);
            const outgoing = from.toLowerCase() === userAddress.toLowerCase();
            const withReceipt = event.eventName === "TransferWithReceipt";

            return {
              id: `${event.transactionHash}-${event.index}`,
              address: outgoing ? to : from,
              timestamp: block?.timestamp ?? 0,
              label: `${outgoing ? "Sent" : "Received"}${withReceipt ? " with receipt" : ""}`,
            };
          })
        );

        if (!active) {
          return;
        }

        rows.sort((a, b) => b.timestamp - a.timestamp);
        setActivity(rows);
      } catch {
        if (active) {
          setActivity([]);
        }
      }
    }

    void loadActivity();

    const handleAccountsChanged = () => {
      void loadActivity();
    };

    window.ethereum?.on?.("accountsChanged", handleAccountsChanged);
    window.ethereum?.on?.("chainChanged", handleAccountsChanged);

    return () => {
      active = false;
      window.ethereum?.removeListener?.("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener?.("chainChanged", handleAccountsChanged);
    };
  }, []);

  return (
    <section className="glass rounded-xl p-4 sm:p-6">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-normal text-zama-soft sm:text-sm">Recent Activity</p>
        <h2 className="mt-2 text-xl font-black text-white sm:text-2xl">Encrypted transfers</h2>
      </div>

      {activity.length ? (
        <div>
          {activity.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              address={transaction.address}
              timestamp={transaction.timestamp}
              label={transaction.label}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/8 bg-white/4 px-4 py-8 text-center sm:px-5">
          <p className="font-black text-white">No transfers yet</p>
          <p className="mt-2 text-sm text-zinc-400">
            Your private activity will appear here after the connected wallet sends or receives ZPAY tokens.
          </p>
        </div>
      )}
    </section>
  );
}
