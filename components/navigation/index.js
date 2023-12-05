"use client";

import {
  Box,
  Text,
  Flex,
  Avatar,
  Spacer,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Navigation() {
  const [value, seValue] = useState("1");
  return (
    <Box px={5} py={5}>
      <Flex align={"center"}>
        <Text fontWeight={600} fontSize={"xl"}>
          Undi Lokal
        </Text>
        <Spacer />
        {/* <Avatar size={"sm"} /> */}
      </Flex>
    </Box>
  );
}
