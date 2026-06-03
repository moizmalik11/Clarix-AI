import "./globals.css";
import Navbar from "../components/Navbar";
import { ClarixProvider } from "../context/ClarixContext";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Clarix AI | AI Tutor",
  description: "AI-powered study guide and examiner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cn("font-sans", sans.variable, display.variable)}>
      <body className="antialiased selection:bg-primary/20 selection:text-primary">
        <ClarixProvider>
          <Navbar />
          <main className="min-h-screen pt-16 flex flex-col">
            {children}
          </main>
        </ClarixProvider>
      </body>
    </html>
  );
}