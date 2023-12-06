"use client";
import { Skeleton, Flex, VStack } from "@chakra-ui/react";

export default function Loading() {
  return (
    <VStack pl={0} align={"start"}>
      <Skeleton width={"70%"} height={8} />
      <Skeleton width={"50%"} height={4} />
      <Flex w={"100%"}>
        <Skeleton width={"10%"} height={5} />
        <Skeleton width={"10%"} height={5} ml={3} />
      </Flex>
      <Flex w={"100%"}>
        <Skeleton width={"13%"} height={6} />
        <Skeleton width={"13%"} height={6} ml={3} />
      </Flex>
    </VStack>
  );
}
