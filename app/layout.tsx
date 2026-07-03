import type { Metadata } from "next";
import { Noto_Sans_Hebrew, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const fontSans = Noto_Sans_Hebrew({
  subsets: ["hebrew"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_APP_TITLE ?? "מוקד אמון"}`,
    default: `${process.env.NEXT_PUBLIC_APP_TITLE ?? "מוקד אמון"}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        fontSans.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        {process.env.NEXT_PUBLIC_IS_DEMO === "true" && (
          <div className="fixed inset-x-0 top-0 z-50 flex h-10 items-center justify-center bg-amber-100 text-amber-900">
            ℹ️ מצב דמו - מוקד אמון - שם משתמש: admin - סיסמה: admin123
          </div>
        )}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
