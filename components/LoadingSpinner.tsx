"use client";

export default function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[1.05rem] w-[1.05rem] animate-spin rounded-full border-2 border-white/30 border-t-white ${className}`}
    />
  );
}
