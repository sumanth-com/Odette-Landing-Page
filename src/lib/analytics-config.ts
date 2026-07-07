export function getGaMeasurementId(): string | undefined {
  return process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || undefined;
}

export function isAnalyticsEnabled(): boolean {
  return Boolean(getGaMeasurementId());
}

export function isGaDebugMode(): boolean {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_GA_DEBUG === "true"
  );
}
