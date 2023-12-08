import { Box, Text, Center } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box w={"100%"} position={"relative"} py={5} color={"GrayText"}>
      <Center>
        <Text>Sistem ini dibangunkan oleh pelajar UMPSA</Text>
      </Center>
    </Box>
  );
}
