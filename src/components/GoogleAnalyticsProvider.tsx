import { AnalyticsListener } from "@/components/AnalyticsListener";
import { getGaMeasurementId, isGaDebugMode } from "@/lib/analytics-config";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Suspense } from "react";

export function GoogleAnalyticsProvider() {
  const measurementId = getGaMeasurementId();

  if (!measurementId) {
    return null;
  }

  return (
    <>
      <GoogleAnalytics gaId={measurementId} debugMode={isGaDebugMode()} />
      <Suspense fallback={null}>
        <AnalyticsListener />
      </Suspense>
    </>
  );
}
