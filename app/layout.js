import Navigation from "@/components/Navigation";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Cloudinary } from "@cloudinary/url-gen";
import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";

export const metadata = {
  title: "UndiLokal - Share Port Best",
  description:
    "UndiLokal adalah platform anda untuk berkongsi pengalaman terbaik di pelabuhan. Berhubung dengan orang lain dan terokai tempat-tempat menarik yang tersembunyi.",
  author: "mistarastapastalaksa",
  keywords: "port, travel, community, sharing",
  image:
    "https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  url: "https://www.undilokal.vercel.app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <head>
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v9/mapbox-gl.css"
            rel="stylesheet"
          />
        </head>
        <body>
          <ChakraProvider>
            <Navigation />
            {children}
            <Toaster />
            {/* <Footer /> */}
          </ChakraProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
