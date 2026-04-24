import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Success Sentinel, a Student Success Platform",
  description:
    "An AI-enabled student success platform that identifies at-risk students early and routes them to personalized support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${inter.className} min-h-full flex flex-col bg-[#080c18] text-[#e8eaf0]`}>
        {children}
      </body>
    </html>
  );
}
