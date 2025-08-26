import type { Metadata } from "next";
import "./globals.css";
import RootProvider from "@/providers/root";
import { cn } from "@/lib/utils";
import { primaryFont } from "@/lib/font";

export const metadata: Metadata = {
  title: "Reflect - We reflect your thoughts",
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
      <body className={cn("antialiased", primaryFont.className)}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
