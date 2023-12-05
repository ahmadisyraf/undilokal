"use client";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import PlaceList from "@/components/placelist";

export default function PlaceLists({ tempat }) {
  return (
    <Box px={5} pt={10}>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={10}
        justifyContent={"center"}
      >
        {tempat.map((d, index) => (
          <GridItem key={index}>
            <PlaceList d={d} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
