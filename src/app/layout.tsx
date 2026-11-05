import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-source" });

export const metadata: Metadata = {
  title: { default: "Marie Learning", template: "%s · Marie Learning" },
  description: "A 16-week beginner programme in full-stack software development, taught live and supported by detailed lessons.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${serif.variable} antialiased`}>{children}</body>
    </html>
  );
}
