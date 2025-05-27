import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Storage Booking System",
  description: "Book your storage unit online",
};

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="animate-pulse text-gray-500">Loading...</div>
  </div>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}
