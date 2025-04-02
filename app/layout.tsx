import type { Metadata } from "next";
import "./globals.css";
import { Provider } from "react-redux";
import { wrapper } from "./store/store"; // Adjust the path as needed

export const metadata: Metadata = {
  title: "SwiftChat",
  description: "Messaging and marketplace website",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Provider store={wrapper.store}>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;
