"use client";

type ToastProps = {
  message: string;
  tone?: "idle" | "success" | "error";
};

export default function Toast({ message, tone = "idle" }: ToastProps) {
  if (!message) {
    return null;
  }

  const toneClass =
    tone === "success"
      ? "text-emerald-300"
      : tone === "error"
        ? "text-rose-300"
        : "text-zinc-400";

  return (
    <p className={`surface-toast status-text text-sm ${toneClass}`} role="status">
      {message}
    </p>
  );
}
