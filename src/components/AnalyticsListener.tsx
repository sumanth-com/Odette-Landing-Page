"use client";

import { trackPageView } from "@/lib/analytics";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

function patchHistoryMethod(
  method: "pushState" | "replaceState",
  onRouteChange: () => void
) {
  const original = history[method].bind(history);

  history[method] = (...args: Parameters<History["pushState"]>) => {
    const result = original(...args);
    onRouteChange();
    return result;
  };

  return () => {
    history[method] = original;
  };
}

export function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const handleRouteChange = () => {
      trackPageView();
    };

    const restorePushState = patchHistoryMethod("pushState", handleRouteChange);
    const restoreReplaceState = patchHistoryMethod("replaceState", handleRouteChange);
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      restorePushState();
      restoreReplaceState();
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    trackPageView(`${pathname}${searchParams.toString() ? `?${searchParams}` : ""}`);
  }, [pathname, searchParams]);

  return null;
}
