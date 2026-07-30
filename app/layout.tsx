import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { Poppins } from "next/font/google";

// Only 400/600/700 are referenced anywhere in the stylesheets; the other six
// weights were downloaded on every page load and never rendered.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
      className={`${poppins.variable} h-full antialiased`}
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

