import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloud Hosting",
  description: "Cloud Hosting Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <Header />
        <ToastContainer theme="colored" position="top-center"/>
        <main className="container">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
