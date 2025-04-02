import type { Metadata } from "next";
import "./globals.css";
import ContextProvider from "./ContextProvider";

export const metadata: Metadata = {
  title: "SwiftChat",
  description: "Messaging and marketplace website",
};

async function RootLayout({ children }: { children: React.ReactNode }) {
  // We will handle session management in the client components
  // to ensure proper Redux integration
  return (
    <html lang="en">
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}

export default RootLayout;
