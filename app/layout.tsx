
import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "My App",
  description: "My Next.js application",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(
          inter.variable,
          geistMono.variable,
          "min-h-full antialiased font-sans"
        )}
      >
        <body className="flex min-h-screen flex-col">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
