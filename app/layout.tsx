import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfairDisplayHeading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription = "Mechanical & Nuclear Engineering Portfolio";

export const metadata: Metadata = {
  metadataBase: new URL("https://barikboley.com"),
  title: "Barik Boley | Portfolio",
  description: siteDescription,
  // Link previews; the image comes from app/opengraph-image.png and app/twitter-image.png
  openGraph: {
    title: "Barik Boley | Portfolio",
    description: siteDescription,
    url: "/",
    siteName: "Barik Boley",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Barik Boley | Portfolio",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", geist.variable, playfairDisplayHeading.variable)}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
