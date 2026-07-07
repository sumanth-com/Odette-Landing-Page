import { type ReactNode } from "react";

export function PostHeroCanvas({ children }: { children: ReactNode }) {
  return (
    <div className="post-hero-canvas relative isolate overflow-x-clip">
      <div className="post-hero-canvas__mesh" aria-hidden="true" />
      <div className="post-hero-canvas__glow post-hero-canvas__glow--left" aria-hidden="true" />
      <div className="post-hero-canvas__glow post-hero-canvas__glow--right" aria-hidden="true" />
      <div className="post-hero-canvas__sheen" aria-hidden="true" />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
