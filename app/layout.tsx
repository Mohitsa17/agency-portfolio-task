import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Building Digital Excellence Together",
  description: "We create stunning digital experiences that drive results. From innovative projects to satisfied clients, we're here to transform your vision into reality.",
  keywords: ["digital agency", "web development", "design", "projects", "clients"],
  authors: [{ name: "Task Project" }],
  openGraph: {
    title: "Building Digital Excellence Together",
    description: "We create stunning digital experiences that drive results.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Building Digital Excellence Together",
    description: "We create stunning digital experiences that drive results.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
