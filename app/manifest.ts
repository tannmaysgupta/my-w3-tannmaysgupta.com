import type { MetadataRoute } from "next";
import { profile } from "@/lib/content/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.shortName,
    description: profile.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#EFF0E8",
    theme_color: "#263E35",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
