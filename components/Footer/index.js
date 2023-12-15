import { Box, Text, Center, Link } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box w={"100%"} position={"relative"} py={5} color={"GrayText"}>
      <Center>
        <Text>
          Sistem ini dibangunkan oleh{" "}
          <Link href={"https://isyrafmagic.vercel.app/"} color={"teal.500"}>@isyrafmagic</Link>
        </Text>
      </Center>
    </Box>
  );
}
