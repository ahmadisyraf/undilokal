"use client";
import { Input, Button, Stack, Box, Heading } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { toast } from "react-hot-toast";

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

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const loadingToast = toast.loading("Sedang menyimpan");

    try {
      const response = await fetch("/api/tempat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resdb = await response.json();

      if (resdb) {
        console.log(resdb, "..dari db");
      }

      toast.success("Berjaya disimpan", {
        id: loadingToast,
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      toast.error("Gagal disimpan", {
        id: loadingToast,
      });
    }
  };

  return (
    <Box px={5} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <Heading>Tambah tempat</Heading>
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
