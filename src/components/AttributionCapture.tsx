"use client";

import { captureAndPersistAttribution } from "@/lib/attribution";
import { useEffect } from "react";

export function AttributionCapture() {
  useEffect(() => {
    captureAndPersistAttribution();
  }, []);

  return null;
}
