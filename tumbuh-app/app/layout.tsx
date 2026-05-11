import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import AppWalletProvider from "../components/WalletProvider";
import Navbar from "../components/Navbar";
import LiveTicker from "../components/LiveTicker";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Tumbuh - Real World Tree Sponsorship",
  description: "Verifiable ESG/CSR tree sponsorship dApp on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans bg-[#F9F8F6] text-[#1A2F24] antialiased min-h-screen pt-[116px]`}
      >
        <AppWalletProvider>
          <LiveTicker />
          <Navbar />
          {children}
        </AppWalletProvider>
      </body>
    </html>
  );
}
