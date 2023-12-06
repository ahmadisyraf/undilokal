import Navigation from "@/components/navigation";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "UndiLokal",
  description: "Apa yang best dekat sini?",
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
