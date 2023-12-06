import Navigation from "@/components/navigation";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "UndiLokal - Share Port Best",
  description: "UndiLokal is your platform to share the best port experiences. Connect with others and discover hidden gems.",
  author: "mistarastapastalaksa", // Replace with your name
  keywords: "port, travel, community, sharing",
  image: "/undilokal-logo.png", // Replace with the path to your logo or an image representing your site
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
