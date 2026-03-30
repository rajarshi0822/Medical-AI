import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Emergency First Aid & Triage | AI-Powered Life-Saving Tool",
  description:
    "Instant AI-powered emergency triage and first-aid instructions. Get severity assessments and stabilizing actions for medical emergencies. Not a substitute for professional care — always call 112/108.",
  keywords: [
    "first aid",
    "emergency triage",
    "AI medical assistant",
    "CPR instructions",
    "emergency response",
    "first aid guide",
  ],
  authors: [{ name: "Emergency First Aid & Triage Team" }],
  openGraph: {
    title: "Emergency First Aid & Triage",
    description: "AI-powered emergency first-aid instructions — fast, clear, life-saving.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#DC2626" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased min-h-screen bg-[var(--color-bg)]">
        {children}
      </body>
    </html>
  );
}
