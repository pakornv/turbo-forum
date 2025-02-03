"use client";

import { getQueryClient } from "@/lib/query-client";
import { Toast } from "@repo/ui/toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRouter } from "next/navigation";
import { RouterProvider } from "react-aria-components";

import { ThemeProvider } from "./theme-provider";

declare module "react-aria-components" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const queryClient = getQueryClient();

  return (
    <RouterProvider navigate={router.push}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider enableSystem attribute="class">
          <Toast />
          {children}
          <ReactQueryDevtools />
        </ThemeProvider>
      </QueryClientProvider>
    </RouterProvider>
  );
}
