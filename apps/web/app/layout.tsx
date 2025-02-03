import { Providers } from "@/components/providers";
import type { Metadata } from "next";
import { Castoro, IBM_Plex_Sans_Thai, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  weight: ["400", "500", "600"],
});

const castoro = Castoro({
  variable: "--font-castoro",
  weight: ["400"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Turbo Forum",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${ibmPlexSansThai.variable} ${castoro.variable} flex h-full grow flex-col bg-ui-grey-100`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
