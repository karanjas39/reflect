import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reflect",
    short_name: "Reflect",
    description:
      "Reflect is a platform for converting your thoughts into reality as this is what we do - Reflects.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/manifest-icon-192.maskable.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/manifest-icon-512.maskable.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
