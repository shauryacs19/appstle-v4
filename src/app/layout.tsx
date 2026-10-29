import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces, Inter } from "next/font/google";
import { AppstleBot } from "@/components/features/assistant/AppstleBot";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HoverFX } from "@/components/motion/HoverFX";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SITE_URL } from "@/data/site";
import "@/styles/globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"], display: "swap", axes: ["opsz"] });
const fraunces = Fraunces({ variable: "--font-fraunces", subsets: ["latin"], display: "swap", style: ["normal", "italic"], axes: ["opsz", "SOFT"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Appstle",
  title: "Appstle — Compelling apps at compelling prices",
  description: "Customer retention apps for Shopify: subscriptions, memberships, bundles, loyalty, pickup & delivery.",
};

export const viewport: Viewport = { themeColor: "#FDF6EC", colorScheme: "light" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${bricolage.variable} ${fraunces.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-dvh text-ink">
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.dataset.js=""` }} />
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <HoverFX />
          <AppstleBot />
        </MotionProvider>
      </body>
    </html>
  );
}
