// "use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Dashboard from "@/components/dashboard/Dashboard";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TicTac TacTics",
  description: "Ultimate Tic Tac Toe game with AI and online play, created by Justin Halvorsen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body className={inter.className}>
        <h1 className={"text-center"}>
            TicTac TacTics
        </h1>
        <main className={"main"}>
            {children}
        </main>
    </body>
    </html>
  );
}
