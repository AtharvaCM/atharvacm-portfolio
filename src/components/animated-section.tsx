import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type Props = PropsWithChildren<{
  className?: string;
}>;

export function AnimatedSection({ children, className }: Props) {
  return <div className={cn("section-reveal", className)}>{children}</div>;
}
