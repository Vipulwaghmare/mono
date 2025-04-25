import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Antarakshari - Marathi Song Lyrics",
  description: "Browse and discover Marathi song lyrics, meanings, and more",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container header-content">
            <Link href="/" className="logo">
              अंताक्षरी
            </Link>
            <nav style={{ display: "flex", gap: "1rem" }}>
              <Link href="/aarti" className="btn">
                आरती
              </Link>
              <Link href="/about" className="btn">
                About
              </Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="container">
            <p>
              © {new Date().getFullYear()} Antarakshari - All rights reserved
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
