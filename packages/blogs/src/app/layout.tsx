import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevBlog - Programming Tutorials and Articles",
  description:
    "A blog for web developers featuring tutorials and best practices",
  icons: {
    icon: "/blogs-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4417366559414884"
        crossOrigin="anonymous"
      ></script>
      <body className={`${roboto.variable}`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
