import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwiftChat",
  description: "Messaging and marketplace website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
