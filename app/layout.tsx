import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Արև Իվենթ | Միջոցառումների Կազմակերպում",
  description:
    "Արև Իվենթ — միջոցառումների կազմակերպում, պլանավորում և յուրահատուկ գաղափարների իրականացում։",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hy">
      <body>{children}</body>
    </html>
  );
}