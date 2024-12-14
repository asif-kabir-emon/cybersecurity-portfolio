import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "@/lib/Providers/Providers";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Emon's Portfolio",
  description: "Md Asif Kabir Emon's Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${openSans.className} antialiased`}>
          <Toaster />
          {children}
        </body>
      </html>
    </Providers>
  );
}
