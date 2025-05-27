"use client";
import { useState } from "react";
import VideoLoader from "@/app/components/Loader/page"; // Ensure this path is correct
import "./globals.css";
import Footer from "@/app/components/Footer/page";
import Navbar from "@/app/components/Navbar/page";
import Script from "next/script";
import ReduxProvider from "./components/reduxProvider/ReduxProvider";
export default function RootLayout({ children }) {
  const [showVideo, setShowVideo] = useState(true);

  const handleVideoComplete = () => {
    setShowVideo(false);
  };

  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <title>Smart Part Export</title>

        <link rel="icon" href="/log.png" type="image/png" />

      </head>

      <body>
        {showVideo ? (
          <VideoLoader onComplete={handleVideoComplete} />
        ) : (
          <>
            <ReduxProvider>
              <Navbar />
              <div className="childrens fade-in-content">
                {children}
              </div>
              <Footer />
              <Script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
                crossOrigin="anonymous"
                strategy="afterInteractive"
              />
            </ReduxProvider>
          </>
        )}
      </body>
    </html>
  );
}
