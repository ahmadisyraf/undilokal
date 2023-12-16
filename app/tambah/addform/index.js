"use client";
import {
  Input,
  Button,
  Stack,
  Box,
  Heading,
  Card,
  Text,
  Center,
  VisuallyHidden,
  Image,
  AspectRatio,
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useRef, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Compressor from "compressorjs";
import Map, { Marker } from "react-map-gl";

const schema = yup.object({
  inputName: yup.string().required("Nama tempat perlu di isi"),
  inputAddressLine: yup.string().required("Nama jalan perlu di isi"),
  inputPostcode: yup.string().required("Poskod perlu di isi"),
  inputCity: yup.string().required("Bandar perlu di isi"),
  inputState: yup.string().required("Negeri perlu di isi"),
});

export default function AddForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [marker, setMarker] = useState({
    longitude: 103.32216166238612,
    latitude: 3.797083354634907,
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const inputFileRef = useRef(null);

  const onSubmit = async (data, event) => {
    event.preventDefault();

    console.log("sedang nak post");

    setIsLoading(true);
    const loadingToast = toast.loading("Sedang menyimpan");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ldk0n3ih");

    try {
      const uploadImage = await fetch(
        "https://api.cloudinary.com/v1_1/datj7hdap/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!uploadImage.ok) {
        throw new Error("Image can't be upload");
      }

      const image = await uploadImage.json();

      const obj = {
        inputName: data.inputName,
        inputAddressLine: data.inputAddressLine,
        inputPostcode: data.inputPostcode,
        inputCity: data.inputCity,
        inputState: data.inputState,
        inputImage: image.secure_url,
        inputLongitude: marker.longitude,
        inputLatitude: marker.latitude
      };

      const response = await fetch("/api/tempat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (!response.ok) {
        throw new Error("Failed post to DB");
      }

      toast.success("Berjaya disimpan", {
        id: loadingToast,
      });

      setIsLoading(false);

      router.push("/");
    } catch (err) {
      setIsLoading(false);

      toast.error("Gagal disimpan", {
        id: loadingToast,
      });

      throw new Error(err.message);
    }
  };

  const handleOpenFile = () => {
    inputFileRef.current.click();
  };

  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");

  const handleFileChange = async (event) => {
    const image = event.target.files[0];

    console.log(image, "..image");
    setFilename(image.name);

    try {
      const compressedBlob = await new Promise((resolve, reject) => {
        new Compressor(image, {
          quality: 0.8,
          mimeType: "image/jpeg",
          success(result) {
            resolve(result);
          },
          error(error) {
            reject(error);
          },
        });
      });

      setFile(compressedBlob);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const onMarkerDrag = useCallback((event) => {
    const { lng, lat } = event.lngLat;

    setMarker({
      longitude: lng,
      latitude: lat,
    });
  });

  return (
    <Box
      px={{ base: 5, md: 200 }}
      py={10}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack spacing={5}>
        <Heading>Kongsi Tempat Menarik!</Heading>
        <FormControl isRequired>
          <FormLabel>Nama tempat:</FormLabel>
          <Input
            placeholder="cth: Kedai makan encik rasta"
            size="md"
            {...register("inputName")}
            isInvalid={errors.inputName ? true : false}
            isDisabled={isLoading}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Nama jalan: </FormLabel>
          <Input
            placeholder="cth: Jalan indera mahkota 2"
            size="md"
            {...register("inputAddressLine")}
            isInvalid={errors.inputAddressLine ? true : false}
            isDisabled={isLoading}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Poskod:</FormLabel>
          <Input
            placeholder="cth: 25200"
            size="md"
            {...register("inputPostcode")}
            isInvalid={errors.inputPostcode ? true : false}
            isDisabled={isLoading}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Bandar:</FormLabel>
          <Input
            placeholder="cth: Kuantan"
            size="md"
            {...register("inputCity")}
            isInvalid={errors.inputCity ? true : false}
            isDisabled={isLoading}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Negeri:</FormLabel>
          <Input
            placeholder="cth: Pahang"
            size="md"
            {...register("inputState")}
            isInvalid={errors.inputState ? true : false}
            isDisabled={isLoading}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Muat naik gambar:</FormLabel>
          <Card variant={"outline"} px={5} py={5}>
            {file ? (
              <>
                <AspectRatio
                  ratio={{ base: 3 / 2, md: 1 / 1 }}
                  width={{ base: "100%", md: 200 }}
                  borderRadius={15}
                  overflow={"hidden"}
                >
                  <Image src={URL.createObjectURL(file)} alt="Chosen Image" />
                </AspectRatio>
                <Text color={"GrayText"} mt={3}>
                  {filename}
                </Text>
              </>
            ) : (
              <Center>
                <Box
                  color={"GrayText"}
                  alignItems={"center"}
                  display={"flex"}
                  flexDirection={"column"}
                >
                  <Button
                    onClick={handleOpenFile}
                    colorScheme={"blue"}
                    size={"sm"}
                  >
                    Muat naik
                  </Button>
                  <VisuallyHidden>
                    <input
                      type="file"
                      ref={inputFileRef}
                      onChange={handleFileChange}
                      accept="image/jpg, image/png"
                    />
                  </VisuallyHidden>
                </Box>
              </Center>
            )}
          </Card>
          <FormHelperText>Hanya satu gambar sahaja dibenarkan</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Pin lokasi di dalam peta:</FormLabel>
          <Box borderRadius={15} overflow={"hidden"}>
            <Map
              mapboxAccessToken="pk.eyJ1IjoiaXN5cmFmbWFnaWMiLCJhIjoiY2xwaWxlY211MDBpeDJtbzVucnFoZnFjaiJ9.uqkFjPVrqYGQlVnlLHwhaw"
              initialViewState={{
                longitude: marker.longitude,
                latitude: marker.latitude,
                zoom: 14,
              }}
              style={{ width: "100%", height: 400 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                draggable
                onDrag={onMarkerDrag}
              />
            </Map>
          </Box>
          <FormHelperText>{`longitude: ${marker.longitude}, latitude: ${marker.latitude}`}</FormHelperText>
        </FormControl>

        <Button
          colorScheme="blue"
          variant="solid"
          type="submit"
          isDisabled={isLoading}
        >
          Simpan
        </Button>
      </Stack>
    </Box>
  );
}
