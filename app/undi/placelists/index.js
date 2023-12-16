"use client";

import { Grid, GridItem, Box, Link, Flex, Button } from "@chakra-ui/react";

import dynamic from "next/dynamic";

import Loading from "./loading";

const PlaceList = dynamic(() => import("@/components/PlaceList"), {
  loading: () => <Loading />,
  ssr: false,
});

import MapList from "./MapList";

export default function PlaceLists({ tempat }) {
  return (
    <Box position={"relative"}>
      <Box height={"90vh"} position={"fixed"} width={"100%"} top={0}>
        <MapList tempat={tempat} />
      </Box>
      <Box
        mt={"60vh"}
        bgColor={"white"}
        position={"relative"}
        py={10}
        borderRadius={15}
        px={{ base: 5, md: 10 }}
      >
        <Box pb={8}>
          <Link
            href="/tambah"
            color={"gray.500"}
            fontWeight={500}
            fontStyle={"italic"}
            textDecoration={"underline"}
          >
            Tambah lokasi? Klik di sini
          </Link>
        </Box>
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(2, 1fr)",
          }}
          gap={10}
          justifyContent={"center"}
          w={"100%"}
        >
          {tempat?.map((d, index) => (
            <GridItem key={index} w={"100%"}>
              <PlaceList d={d} />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
