"use client";

type ZamapayLogoProps = {
  compact?: boolean;
};

export default function ZamapayLogo({ compact = false }: ZamapayLogoProps) {
  return (
    <div className="flex items-center">
      <img
        src="/zamapay-logo.svg"
        alt="ZAMAPAY"
        className={compact ? "h-12 w-auto max-w-[180px]" : "h-auto w-full max-w-[520px]"}
      />
    </div>
  );
}
