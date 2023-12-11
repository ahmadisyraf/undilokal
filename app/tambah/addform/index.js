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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaImage } from "react-icons/fa";

const schema = yup.object({
  inputName: yup.string().required("Nama tempat perlu di isi"),
  inputAddress: yup.string().required("Alamat tempat perlu di isi"),
});

export default function AddForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const inputFileRef = useRef(null);

  const onSubmit = async (data) => {
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

      console.log(image);

      const obj = {
        inputName: data.inputName,
        inputAddress: data.inputAddress,
        inputImage: image.secure_url,
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

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  return (
    <Box px={5} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Heading>Tambah tempat</Heading>
        <Card variant={"outline"} px={5} py={5} onClick={handleOpenFile}>
          {file ? (
            <AspectRatio ratio={3 / 2}>
              <Image src={URL.createObjectURL(file)} alt="Chosen Image" />
            </AspectRatio>
          ) : (
            <Center>
              <Box
                color={"GrayText"}
                alignItems={"center"}
                display={"flex"}
                flexDirection={"column"}
              >
                <FaImage fontSize={50} />
                <Heading size={"md"}>Add and upload image</Heading>
                <VisuallyHidden>
                  <input
                    type="file"
                    ref={inputFileRef}
                    onChange={handleFileChange}
                  />
                </VisuallyHidden>
              </Box>
            </Center>
          )}
        </Card>
        <Text color={"GrayText"}>{filename}</Text>
        <Input
          placeholder="Nama tempat"
          size="md"
          {...register("inputName")}
          isInvalid={errors.inputName ? true : false}
          isDisabled={isLoading}
        />
        <Input
          placeholder="Lokasi"
          size="md"
          {...register("inputAddress")}
          isInvalid={errors.inputAddress ? true : false}
          isDisabled={isLoading}
        />
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
