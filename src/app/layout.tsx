import type { Metadata } from "next";
import { Inter, Khand, Rakkas } from "next/font/google";
import "./globals.css";
import WrapProvider from "./WrapProvider";
import Nav from "@/components/share/Nav/Nav";
import Navbar from "@/components/share/Nav/Navbar";
import { Toaster } from "@/components/ui/sonner";

// const inter = Inter({ subsets: ["latin"] });
const rakkas = Khand({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ferdousi's Henna Art - Premium Henna Products & Artist Booking",
  description:
    "Explore Ferdousi's Henna Art for high-quality henna cones and henna powder. Book talented henna artists for your special occasions like Eid, weddings, and cultural celebrations. Connect with us on Instagram and Facebook for the latest designs and offers.",
  keywords:
    "henna art, buy henna cones, henna powder, book henna artists, Eid henna, wedding henna, cultural celebrations, henna design, Ferdousi's Henna Art",
  authors: [
    {
      name: "Ferdousi's Henna Art",
      url: "https://ferdousis-henna-art-delta.vercel.app/",
    },
  ],
  openGraph: {
    title: "Ferdousi's Henna Art - Quality Henna Products & Services",
    description:
      "Shop the finest henna products and schedule appointments with expert henna artists for occasions such as Eid and weddings. Stay updated by following us on Instagram and Facebook.",
    url: "https://ferdousis-henna-art-delta.vercel.app/", // Update with your actual website URL
    images: [
      {
        url: "/images/henna-product.jpg", // Link to a relevant image
        alt: "Ferdousi's Henna Art",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FerdousisHenna", // Your Twitter handle (if applicable)
    title: "Ferdousi's Henna Art - Buy Henna Products & Book Artists",
    description:
      "Find premium henna cones and powder, and book expert henna artists for your events. Follow us on Instagram and Facebook for updates and offers!",
    images: [
      {
        url: "/images/henna-product.jpg", // Link to the same relevant image
        alt: "Ferdousi's Henna Art",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <WrapProvider>
        <body className={`${rakkas.className} bg-background`}>
          <Navbar />
          {children}
          <Toaster richColors/>
        </body>
      </WrapProvider>
    </html>
  );
}
