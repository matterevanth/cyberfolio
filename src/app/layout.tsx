import type { Metadata } from 'next';
// Removed GeistSans import
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Import Toaster

export const metadata: Metadata = {
  title: 'RevPortfolio',
  description: 'Portfolio of Revanth Matte',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Removed GeistSans variable from className
    <html lang="en" className="dark"> {/* Ensure dark class remains */}
      {/* Removed font-sans class, body font is set in globals.css */}
      <body className="antialiased bg-background text-foreground">
        {children}
        <Toaster /> {/* Add Toaster component */}
      </body>
    </html>
  );
}
