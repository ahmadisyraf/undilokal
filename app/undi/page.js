import dynamic from "next/dynamic";
const PlaceLists = dynamic(() => import("@/app/undi/placelists"), {
  ssr: false,
});

import { Box } from "@chakra-ui/react";

export const revalidate = 0;
async function getData() {
  const res = await fetch(process.env.URL + "/api/tempat", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return data;
}
export default async function Undi() {
  const tempat = await getData();

  return (
    <Box py={10}>
      <PlaceLists tempat={tempat} />
    </Box>
  );
}
