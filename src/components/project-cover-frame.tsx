import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  alt: string;
  children?: ReactNode;
  className?: string;
  chromeDensity?: "compact" | "default";
  fit?: "contain" | "cover";
  imageClassName?: string;
  priority?: boolean;
  sizes: string;
  src: string;
};

export function ProjectCoverFrame({
  alt,
  children,
  className = "",
  chromeDensity = "default",
  fit = "cover",
  imageClassName = "",
  priority = false,
  sizes,
  src
}: Props) {
  const isCompact = chromeDensity === "compact";

  return (
    <div
      className={`relative overflow-hidden rounded-[1.2rem] border border-border/65 bg-[linear-gradient(180deg,hsl(var(--surface))_0%,hsl(var(--surface-soft))_100%)] shadow-[0_28px_60px_-44px_hsl(var(--text)/0.24)] ${className}`.trim()}
    >
      <div
        className={`relative z-10 flex items-center gap-2 border-b border-border/60 bg-[hsl(var(--surface)/0.98)] ${
          isCompact ? "px-3 py-2" : "px-4 py-3"
        }`}
      >
        <span
          className={`rounded-full bg-[#FF605C] ${isCompact ? "h-2 w-2" : "h-2.5 w-2.5"}`}
        />
        <span
          className={`rounded-full bg-[#FFBD44] ${isCompact ? "h-2 w-2" : "h-2.5 w-2.5"}`}
        />
        <span
          className={`rounded-full bg-[#00CA4E] ${isCompact ? "h-2 w-2" : "h-2.5 w-2.5"}`}
        />
        <div
          className={`ml-3 flex-1 rounded-full border border-border/60 bg-[hsl(var(--surface-soft)/0.9)] ${
            isCompact ? "h-5" : "h-7"
          }`}
        />
      </div>

      <div className="relative min-h-0 bg-[hsl(var(--surface-soft)/0.72)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-14 bg-gradient-to-b from-white/12 to-transparent" />
        <div className="relative aspect-[16/9]">
          <Image
            alt={alt}
            className={`${fit === "contain" ? "object-contain" : "object-cover"} object-top ${imageClassName}`.trim()}
            fill
            priority={priority}
            sizes={sizes}
            src={src}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-text/16 via-transparent to-transparent" />
        {children ? <div className="absolute left-4 top-4 z-20">{children}</div> : null}
      </div>
    </div>
  );
}
