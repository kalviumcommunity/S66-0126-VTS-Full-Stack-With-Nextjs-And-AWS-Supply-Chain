"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";
import { fetcher } from "@/lib/fetcher";

export default function SWRProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: true,
        dedupingInterval: 5000,
        shouldRetryOnError: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}
