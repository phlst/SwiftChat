import type { Metadata } from "next";
import "./globals.css";
import ContextProvider from "./ContextProvider";

export const metadata: Metadata = {
  title: "SwiftChat",
  description: "Messaging and marketplace website",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
