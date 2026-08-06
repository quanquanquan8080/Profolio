import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tony-quan-portfolio.vercel.app"),
  title: "Tran Minh Quan (Tony) | Student Portfolio",
  description:
    "Personal portfolio of Tran Minh Quan, a student at The American School, featuring his writing, interests, and plans to teach younger students in Vietnam.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Tran Minh Quan (Tony) | Student Portfolio",
    description:
      "Writing, interests, and a future teaching program for younger students in Vietnam.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1536,
        height: 1024,
        alt: "Tran Minh Quan student portfolio and ten-essay writing collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tran Minh Quan (Tony) | Student Portfolio",
    description: "Ten essays exploring AI and Vietnamese culture.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable}`}>{children}</body>
    </html>
  );
}
