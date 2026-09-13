import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Harmonie van Horst - Admin",
  description: "Admin panel voor Harmonie van Horst",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
