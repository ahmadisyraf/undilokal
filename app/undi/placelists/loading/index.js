"use client";
import {
  Grid,
  GridItem,
  Box,
  Skeleton,
  Flex,
  VStack,
} from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box px={5}>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={10}
        justifyContent={"center"}
      >
        {[...Array(10)].map((data, index) => (
          <GridItem key={index}>
            <VStack pl={0} align={"start"}>
              <Skeleton width={"70%"} height={5} />
              <Skeleton width={"50%"} height={3} />
              <Flex w={"100%"}>
                <Skeleton width={"10%"} height={3} />
                <Skeleton width={"10%"} height={3} ml={3}/>
              </Flex>
              <Flex w={"100%"}>
                <Skeleton width={"13%"} height={4} />
                <Skeleton width={"13%"} height={4} ml={3}/>
              </Flex>
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
