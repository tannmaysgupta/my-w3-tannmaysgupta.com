"use client";

import { MeshGradient } from "@paper-design/shaders-react";

export type MeshGradientCanvasProps = {
  colors: string[];
  /** 0 freezes the shader on its first frame — used for reduced motion. */
  speed: number;
};

/**
 * Isolated so `next/dynamic` can code-split the WebGL bundle away from the
 * initial page load. Nothing else in the site imports paper-design/shaders.
 */
export default function MeshGradientCanvas({ colors, speed }: MeshGradientCanvasProps) {
  return (
    <MeshGradient
      colors={colors}
      distortion={0.7}
      swirl={0.5}
      speed={speed}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
