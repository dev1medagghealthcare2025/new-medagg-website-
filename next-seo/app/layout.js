import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatbotClient from "./ChatbotClient";
import FooterClient from "./FooterClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Home - United towards a healthy tomorrow",
  description: "Home - United towards a healthy tomorrow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <ChatbotClient />
        <FooterClient />
      </body>
    </html>
  );
}
