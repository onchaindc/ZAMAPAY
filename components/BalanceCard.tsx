"use client";

import { useState } from "react";
import { connectWallet, getZamapayContract } from "@/lib/contract";
import { userDecryptBalanceHandle } from "@/lib/fhevm";
import LoadingSpinner from "@/components/LoadingSpinner";
import Toast from "@/components/Toast";
import { getFriendlyErrorMessage } from "@/lib/ui";

const MAX_UINT64 = BigInt("18446744073709551615");
const DECRYPTION_UPPER_BOUND = BigInt("1000000000000");

export default function BalanceCard() {
  const [balance, setBalance] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [tone, setTone] = useState<"idle" | "success" | "error">("idle");

  async function revealBalance() {
    setLoading(true);
    setToast("");
    setTone("idle");

    try {
      const wallet = await connectWallet();
      const contract = getZamapayContract(wallet.signer);
      const userAddress = await wallet.signer.getAddress();
      const handle = await contract.balanceOf(userAddress);
      const value = await userDecryptBalanceHandle(userAddress, handle, wallet.signer);
      const decryptedBalance = value?.toString?.() ?? String(value);

      if (BigInt(decryptedBalance) === MAX_UINT64 || BigInt(decryptedBalance) > DECRYPTION_UPPER_BOUND) {
        setBalance("Decryption pending...");
        return;
      }

      setBalance(decryptedBalance);
      setToast("Balance revealed locally.");
      setTone("success");
    } catch (error) {
      setToast(getFriendlyErrorMessage(error, "network"));
      setTone("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="glass rounded-xl p-4 sm:p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-normal text-zama-soft sm:text-sm">Your Balance</p>
          <div className="mt-3 flex flex-wrap items-end gap-3">
            <span className="status-text text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              {balance || "\u2022\u2022\u2022\u2022"}
            </span>
            <span className="pb-1 text-sm font-semibold text-zinc-400">ZPAY</span>
          </div>
        </div>
        <button
          type="button"
          onClick={revealBalance}
          disabled={loading}
          className="secondary-button sm:w-auto"
        >
          {loading ? <LoadingSpinner className="mr-2" /> : null}
          Reveal
        </button>
      </div>
      <div className="mt-4">
        <Toast message={toast} tone={tone} />
      </div>
    </section>
  );
}
