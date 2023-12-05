"use client";

import { Box, Text, Flex, Avatar, Spacer, Button } from "@chakra-ui/react";
import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [value, seValue] = useState("1");
  return (
    <Box px={5} py={5}>
      <Flex align={"center"}>
        <Link href={"/"}>
          <Text fontWeight={600} fontSize={"xl"}>
            Undi Lokal
          </Text>
        </Link>
        <Spacer />
        <Link href={"/tambah"}>
          <Button variant={"solid"} colorScheme={"blue"} size={"sm"}>
            Tambah
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}
