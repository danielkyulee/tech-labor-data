import type { Metadata } from "next";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const socialImage = `${siteUrl}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: "Tech and Labor Data Research Group",
    template: "%s · Tech and Labor Data Research Group",
  },
  description: "Researching why some AI products are built to replace work while others are built to assist.",
  openGraph: {
    title: "Tech and Labor Data Research Group",
    description: "Why are some AI products built to replace while others assist?",
    type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, alt: "Tech and Labor Data Research Group" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech and Labor Data Research Group",
    description: "Why are some AI products built to replace while others assist?",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
