import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

  const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
  });

  export const metadata: Metadata = {
    title: "AI-LMC Enterprise — AI Learning Management & Creator",
    description:
      "Platform enterprise terintegrasi untuk konversi dokumen SOP menjadi video pelatihan interaktif dan pelacakan kompetensi karyawan.",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return(
    <html lang="id" className={`dark ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#13111C] text-[#DCDCE0] flex flex-col font-sans selection:bg-[#853BCE] selection:text-white">
        {children}
      </body>
    </html>
);
}
