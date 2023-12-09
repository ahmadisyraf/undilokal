"use client";

import { Grid, GridItem, Box, Link } from "@chakra-ui/react";

import dynamic from "next/dynamic";

import Loading from "./loading";

const PlaceList = dynamic(() => import("@/components/PlaceList"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function PlaceLists({ tempat }) {
  return (
    <Box width={"100%"} px={10}>
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
  );
}
