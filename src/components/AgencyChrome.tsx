"use client";

import { usePathname } from "next/navigation";
import { hostname } from "os";
import React from "react";

export default function AgencyChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const host = hostname();
  const isStorefront = host.startsWith("shriamarcrafts");

  if (isStorefront) {
    return null;
  }

  return <>{children}</>;
}
