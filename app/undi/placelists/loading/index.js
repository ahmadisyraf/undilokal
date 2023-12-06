"use client";
import { Skeleton, Flex, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <VStack pl={0} align={"start"}>
      <Skeleton width={"70%"} height={5} />
      <Skeleton width={"50%"} height={3} />
      <Flex w={"100%"}>
        <Skeleton width={"10%"} height={3} />
        <Skeleton width={"10%"} height={3} ml={3} />
      </Flex>
      <Flex w={"100%"}>
        <Skeleton width={"13%"} height={4} />
        <Skeleton width={"13%"} height={4} ml={3} />
      </Flex>
    </VStack>
  );
}
