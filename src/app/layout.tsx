import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/components/providers/AppProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "GILZOD | Rule Beyond Limits — Premium Menswear",
  description:
    "Premium luxury menswear for ambitious men. Discover timeless style, exceptional quality, and modern sophistication.",
  keywords: ["luxury menswear", "premium fashion", "GILZOD", "designer clothing"],
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    shortcut: "/favicon-32.png",
  },
  openGraph: {
    title: "GILZOD | Rule Beyond Limits",
    description: "Premium luxury menswear for ambitious men who refuse ordinary.",
    type: "website",
    images: [{ url: "/favicon.png", alt: "GILZOD Logo" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased min-w-0">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
