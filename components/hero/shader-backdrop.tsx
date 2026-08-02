"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Split out of the initial bundle — the WebGL code only loads if it's used. */
const MeshGradientCanvas = dynamic(() => import("./mesh-gradient-canvas"), {
  ssr: false,
});

const PALETTES = {
  light: ["#FAFAFA", "#7FC8A9", "#DDE9E4", "#2B3A3A"],
  dark: ["#2B3A3A", "#7FC8A9", "#3D5555", "#1E2A2A"],
} as const;

/** Cheap capability probe — cached, since the answer can't change mid-session. */
let webGlSupport: boolean | null = null;
function hasWebGl(): boolean {
  if (webGlSupport !== null) return webGlSupport;
  try {
    const canvas = document.createElement("canvas");
    webGlSupport = Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    webGlSupport = false;
  }
  return webGlSupport;
}

function prefersLightweight(): boolean {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (!connection) return false;
  return connection.saveData === true || /(^|-)2g$/.test(connection.effectiveType ?? "");
}

/**
 * The site's only WebGL canvas.
 *
 * A CSS gradient is always painted underneath, so every path below — no JS, no
 * WebGL, Save-Data, or simply scrolled past — lands on a hero that still looks
 * finished rather than blank. Four guards decide whether the canvas layers on
 * top of it:
 *
 *   1. `ssr: false` + dynamic import, so the shader never blocks first paint
 *   2. IntersectionObserver, so it doesn't run while off-screen
 *   3. reduced motion -> speed 0, freezing it on frame one (Paper Shaders has
 *      no built-in handling for this, so it has to be done here)
 *   4. Save-Data / 2G / no WebGL -> never mounted at all
 */
export function ShaderBackdrop() {
  const shouldReduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [canRender, setCanRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setCanRender(hasWebGl() && !prefersLightweight());
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || !canRender) return;

    // Pause once scrolled past: no reason to burn GPU on an off-screen canvas.
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      rootMargin: "128px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [canRender]);

  const colors = resolvedTheme === "dark" ? PALETTES.dark : PALETTES.light;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Always-present base. This is the whole fallback story. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,color-mix(in_oklab,var(--sage)_38%,transparent),transparent_60%),radial-gradient(90%_70%_at_85%_15%,color-mix(in_oklab,var(--sage)_18%,transparent),transparent_65%)]" />

      {canRender && isVisible && (
        <div
          className="absolute inset-0 opacity-35 mix-blend-multiply transition-opacity duration-700 dark:opacity-40 dark:mix-blend-screen"
          style={{
            maskImage: "radial-gradient(110% 85% at 30% 10%, black 20%, transparent 72%)",
            WebkitMaskImage: "radial-gradient(110% 85% at 30% 10%, black 20%, transparent 72%)",
          }}
        >
          <MeshGradientCanvas colors={[...colors]} speed={shouldReduceMotion ? 0 : 0.15} />
        </div>
      )}

      {/* Grain sits above the shader to knock the sheen off it. */}
      <div className="grain absolute inset-0" />

      {/* Fade into the page rather than ending on a hard edge. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
