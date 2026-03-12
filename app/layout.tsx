import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from 'next-view-transitions'
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL('https://vhack.online'),
  title: {
    default: "VHACK 2.0 | VITS Hyderabad Hackathon",
    template: "%s | VHACK 2.0"
  },
  description: "VHACK 2.0 is VITS Hyderabad's student-run hackathon. Join us for 2 days of coding, innovation, and fun. February 27-28, 2026.",
  icons: {
    icon: '/vh_2.0.png',
  },
  keywords: ["Hackathon", "VITS", "Coding", "VHACK", "Hyderabad", "Tech Event", "Vignan"],
  openGraph: {
    title: "VHACK 2.0 | VITS Hyderabad Hackathon",
    description: "Join us for 2 days of coding, innovation, and fun at Vignan Institute of Technology and Science, Hyderabad.",
    url: 'https://vhack.online',
    siteName: 'VHACK 2.0',
    images: [
      {
        url: '/vh_2.0.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import LayoutWrapper from "@/components/LayoutWrapper";

import { AuthProvider } from "@/context/AuthContext";
import { HackathonProvider } from "@/context/HackathonContext";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <script src="https://sdk.cashfree.com/js/v3/cashfree.js"></script>
        </head>
        <body
          className="antialiased overflow-x-hidden bg-black"
          suppressHydrationWarning
        >
          <AuthProvider>
            <HackathonProvider>
              <SmoothScroll>
                <LayoutWrapper>
                  {children}
                </LayoutWrapper>
                <Toaster
                  position="top-center"
                  theme="dark"
                  richColors
                  toastOptions={{
                    style: {
                      background: "rgba(11, 1, 20, 0.8)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      color: "#fff",
                      fontFamily: "'Gilroy-Medium', sans-serif",
                      borderRadius: "16px",
                      boxShadow: "0 10px 30px -10px rgba(109, 40, 217, 0.3)",
                    },
                    classNames: {
                      toast: "group toast-group",
                      title: "group-[.toast]:font-bold group-[.toast]:text-base",
                      description: "group-[.toast]:text-white/60",
                      actionButton: "group-[.toast]:bg-purple-600 group-[.toast]:text-white",
                      cancelButton: "group-[.toast]:bg-white/10 group-[.toast]:text-white",
                      error: "group-[.toast]:text-red-400 group-[.toast]:border-red-500/20",
                      success: "group-[.toast]:text-green-400 group-[.toast]:border-green-500/20",
                      warning: "group-[.toast]:text-yellow-400 group-[.toast]:border-yellow-500/20",
                      info: "group-[.toast]:text-blue-400 group-[.toast]:border-blue-500/20",
                    },
                  }}
                />
              </SmoothScroll>
            </HackathonProvider>
          </AuthProvider>
        </body>
      </html>
    </ViewTransitions >
  );
}
