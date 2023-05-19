// These styles apply to every route in the application
import "@/styles/globals.css";
import { Metadata } from "next";
import { Roboto_Flex as Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthStatus from "@/components/auth-status";
import { Suspense } from "react";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeLeap",
  description: "Code test by Felipe Bueno",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <Toaster />
        <Suspense fallback="Loading...">
          {/* @ts-expect-error Async Server Component */}
          <AuthStatus />
        </Suspense>
        <main
          className={`${roboto.variable} font-sans bg-primary w-full min-h-screen`}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
