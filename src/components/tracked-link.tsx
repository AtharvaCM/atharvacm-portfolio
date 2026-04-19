"use client";

import Link, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

import { type GtmEventPayload, trackEvent } from "@/lib/gtm-events";

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "href"> & {
    children: ReactNode;
    trackingEvent?: string;
    trackingPayload?: GtmEventPayload;
  };

export function TrackedLink({
  children,
  onClick,
  trackingEvent,
  trackingPayload,
  ...props
}: Props) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (!event.defaultPrevented && trackingEvent) {
      trackEvent(trackingEvent, trackingPayload);
    }
  }

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
