import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/Theme-provider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { ClientProvider } from "@/components/ClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShayarSpot – Best Hindi Shayari Collection for Every Mood",
  description:
    "Read and share the most heart-touching Hindi Shayari on love, friendship, breakup, sadness, motivation, and more. ShayarSpot brings soul-stirring poetry and emotional quotes all in one place. Mobile-friendly & beautifully designed.",
  keywords: [
    "Hindi Shayari",
    "ShayarSpot",
    "Love Shayari",
    "Friendship Shayari",
    "Sad Shayari",
    "Breakup Shayari",
    "Motivational Shayari",
    "Heart Touching Shayari",
    "Hindi Quotes",
    "Emotional Shayari",
    "Shayari for WhatsApp",
    "Latest Shayari Collection",
    "Beautiful Hindi Poetry",
  ],
  openGraph: {
    title: "ShayarSpot – Best Hindi Shayari Collection for Every Mood",
    description:
      "Explore emotional and relatable Hindi Shayari for love, breakup, dosti, and more. Updated daily with powerful quotes and poetry.",
    url: "https://shayarspot.vercel.app",
    siteName: "ShayarSpot",
    images: [
      {
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiSlqiBCp9BlE9lBnmMnRmpgw-uKDOAHEodA&s", // replace with your OG image
        width: 1200,
        height: 630,
        alt: "ShayarSpot - Best Hindi Shayari Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ShayarSpot – Best Hindi Shayari Collection",
    description:
      "Feel the depth of emotions through beautiful Shayari. Love, sadness, friendship, breakup – all at ShayarSpot.",
    images: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiSlqiBCp9BlE9lBnmMnRmpgw-uKDOAHEodA&s"], // replace this too
  },
  metadataBase: new URL("https://shayarspot.vercel.app"),
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClientProvider>
            <Navbar />
            {children}
            <Footer />
            <Toaster />
            <Analytics />
          </ClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
