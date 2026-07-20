import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Poppins } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "2026",
  description: "Orientation Week Universitas Ciputra Surabaya 2026",
  icons: {
    icon: "/assets/template/oweek-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col overflow-x-hidden pt-20"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

