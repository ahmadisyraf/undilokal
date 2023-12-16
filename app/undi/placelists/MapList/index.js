import { Map, Marker, Popup } from "react-map-gl";
import { useState } from "react";
import {
  Box,
  Text,
  Heading,
  Image,
  AspectRatio,
  VStack,
  Card,
} from "@chakra-ui/react";

export default function MapList({ tempat }) {
  const [marker, setMarker] = useState({
    longitude: 103.32216166238612,
    latitude: 3.797083354634907,
  });

  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);

  const handleMarkerClick = (index) => {
    setSelectedMarkerIndex(index);
  };

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiaXN5cmFmbWFnaWMiLCJhIjoiY2xwaWxlY211MDBpeDJtbzVucnFoZnFjaiJ9.uqkFjPVrqYGQlVnlLHwhaw"
      initialViewState={{
        longitude: marker.longitude,
        latitude: marker.latitude,
        zoom: 10,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {tempat.map((d, index) => (
        <div key={index}>
          <Marker
            longitude={d.coordinate.longitude}
            latitude={d.coordinate.latitude}
            onClick={() => handleMarkerClick(index)}
          >
            <Box
              bgColor={"blue.500"}
              borderRadius={"100%"}
              aspectRatio={"1/1"}
              color={"white"}
              border={"3px solid white"}
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              width={10}
              height={10}
            >
              <Text fontSize={"small"} px={1} py={1} fontWeight={"bold"}>
                {d.comments.length}
              </Text>
            </Box>
          </Marker>
          {selectedMarkerIndex === index && (
            <Popup
              longitude={d.coordinate.longitude}
              latitude={d.coordinate.latitude}
              closeOnMove={true}
              closeButton={false}
              closeOnClick={false}
              onClose={() => setSelectedMarkerIndex(null)}
            >
              <AspectRatio ratio={3 / 2} borderRadius={15} overflow={"hidden"}>
                <Image src={d.image} fit={"contain"} loading="lazy" />
              </AspectRatio>
              <VStack spacing={"md"} mt={2} textAlign={"left"}>
                <Heading size="sm">{d.name}</Heading>
                <Text fontSize={"sm"} color={"GrayText"}>
                  {d.address
                    ? d.address.addressLine +
                      ", " +
                      d.address.postcode +
                      " " +
                      d.address.city +
                      ", " +
                      d.address.state
                    : null}
                </Text>
              </VStack>
            </Popup>
          )}
        </div>
      ))}
    </Map>
  );
}
