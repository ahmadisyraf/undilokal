import Navigation from "@/components/navigation";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "UndiLokal - Share Port Best",
  description: "UndiLokal adalah platform anda untuk berkongsi pengalaman terbaik di pelabuhan. Berhubung dengan orang lain dan terokai tempat-tempat menarik yang tersembunyi.",
  author: "mistarastapastalaksa", // Replace with your name
  keywords: "port, travel, community, sharing",
  image: "https://images.unsplash.com/photo-1596423735880-5f2a689b903e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with the path to your logo or an image representing your site
  url: "https://www.undilokal.vercel.app", // Replace with your actual website URL
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Navigation />
          {children}
          <Toaster />
        </ChakraProvider>
      </body>
    </html>
  );
}
