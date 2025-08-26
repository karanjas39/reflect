import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reflect - AI-Powered Creative Studio",
  description:
    "Reflect is a lightweight AI-inspired studio to upload images, craft prompts, and apply styles for instant creative generations.",
  keywords: [
    "Reflect",
    "AI studio",
    "image generation",
    "creative tools",
    "frontend assignment",
    "React",
    "Next.js",
  ],
  authors: [
    {
      name: "Jaskaran Singh",
      url: "https://www.linkedin.com/in/singhjaskaran",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
