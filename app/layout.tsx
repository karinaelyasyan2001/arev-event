import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://arev-event.am"),

  title: {
    default: "Արև Իվենթ | Միջոցառումների կազմակերպում",
    template: "%s | Արև Իվենթ",
  },

  description:
    "Արև Իվենթ-ը միջոցառումների կազմակերպման և պլանավորման հարթակ է Հայաստանում։ Ստեղծեք, պլանավորեք և կառավարեք ձեր կարևոր օրը մեկ վայրում։",

  keywords: [
    "Արև Իվենթ",
    "Arev Event",
    "միջոցառումների կազմակերպում",
    "միջոցառումների պլանավորում",
    "հարսանիքի կազմակերպում",
    "ծննդյան կազմակերպում",
    "կորպորատիվ միջոցառումներ",
    "միջոցառումներ Հայաստան",
    "event planning Armenia",
  ],

  authors: [
    {
      name: "Արև Իվենթ",
    },
  ],

  creator: "Արև Իվենթ",
  publisher: "Արև Իվենթ",

  applicationName: "Արև Իվենթ",

  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "hy_AM",
    url: "https://arev-event.am",
    siteName: "Արև Իվենթ",
    title: "Արև Իվենթ | Միջոցառումների կազմակերպում",
    description:
      "Ստեղծեք և պլանավորեք ձեր կարևոր օրը Արև Իվենթ-ի միջոցով։",
  },

  twitter: {
    card: "summary_large_image",
    title: "Արև Իվենթ | Միջոցառումների կազմակերպում",
    description:
      "Ձեր օրը։ Ձեր պատմությունը։ Ձեր Արևը։",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hy">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}