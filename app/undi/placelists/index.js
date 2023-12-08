"use client";

import { Grid, GridItem, Box } from "@chakra-ui/react";

import dynamic from "next/dynamic";

import Loading from "./loading";

const PlaceList = dynamic(() => import("@/app/components/PlaceList"), {
  loading: () => <Loading />,
  ssr: false,
});

export default function PlaceLists({ tempat }) {
  return (
    <Box width={"100%"} px={10}>
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
