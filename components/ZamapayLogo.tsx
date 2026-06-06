"use client";

type ZamapayLogoProps = {
  compact?: boolean;
};

export default function ZamapayLogo({ compact = false }: ZamapayLogoProps) {
  return (
    <div className="flex items-center">
      <img
        src="/zamapay-logo.jpg"
        alt="ZAMAPAY"
        className={
          compact
            ? "h-12 w-auto max-w-[190px] rounded-sm object-contain"
            : "h-auto w-full max-w-[560px] rounded-lg object-contain"
        }
      />
    </div>
  );
}
