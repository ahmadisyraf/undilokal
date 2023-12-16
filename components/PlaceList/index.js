"use client";

import {
  Box,
  Text,
  Flex,
  Textarea,
  Button,
  Link,
  Avatar,
  Image,
  AspectRatio,
  Card,
  Skeleton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import ImageModal from "../ImageModal";

const schema = yup.object({
  inputComment: yup.string().required("Komen perlu di isi"),
});

export default function PlaceList({ d }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const loadingToast = toast.loading("Sila tunggu");
      const response = await fetch(`/api/tempat/comment/${d.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("Gagal disimpan", { id: loadingToast });
      } else {
        toast.success("Komen berjaya disimpan", { id: loadingToast });
        reset();
      }

      setIsLoading(false);
      router.refresh();
    } catch (err) {
      toast.error("Gagal disimpan", { id: loadingToast });
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <Card variant={"outline"} px={5} py={5} borderRadius={15}>
      <Box w={"100%"} position={"relative"}>
        <Box pb={3}>
          {d.user ? (
            <Box my={3}>
              <Flex alignItems={"center"}>
                <Avatar src={d.user?.image} />
                <Box ml={3}>
                  <Text fontWeight={600}>
                    {d.user
                      ? d.user.firstName + " " + d.user.lastName
                      : "Anonymous"}
                  </Text>
                  <Text color={"GrayText"}>{d.user.email}</Text>
                </Box>
              </Flex>
            </Box>
          ) : null}
        </Box>
        {d.image ? (
          <Box
            pb={5}
            borderRadius={15}
            overflow={"hidden"}
            onClick={() => setOpen(true)}
          >
            <AspectRatio ratio={3 / 2} borderRadius={15} overflow={"hidden"}>
              <Image
                src={d.image}
                fit={"contain"}
                fallback={<Skeleton height={450 * (2 / 3)} width="100%" />}
                loading="lazy"
              />
            </AspectRatio>
          </Box>
        ) : null}
        <Flex w={"100%"}>
          <Box>
            <Text fontSize={"lg"} fontWeight={600}>
              {d.name}
            </Text>
            <Flex color={"GrayText"}>
              <Flex align={"center"}>
                <Text fontSize={"md"}>
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
              </Flex>
            </Flex>
            <Box mt={3}>
              <Text>Komen :</Text>
              <Box>
                {d.comments.map((d, index) => (
                  <Box my={3} key={index}>
                    <Flex alignItems={"center"}>
                      <Avatar src={d.user?.image} />
                      <Box ml={3}>
                        <Flex>
                          <Text fontWeight={600}>
                            {d.user
                              ? d.user.firstName + " " + d.user.lastName
                              : "Anonymous"}
                          </Text>
                        </Flex>
                        <Box>
                          <Text>{d.comment}</Text>
                        </Box>
                      </Box>
                    </Flex>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Flex>
        <SignedIn>
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <Textarea
              placeholder="Memberi komen"
              mt={2}
              w={"100%"}
              {...register("inputComment")}
              isInvalid={errors.inputComment ? true : false}
              isDisabled={isLoading}
            />
            <Button
              variant={"solid"}
              colorScheme={"blue"}
              size={"sm"}
              mt={3}
              type="submit"
              isDisabled={isLoading}
            >
              Komen
            </Button>
          </Box>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Text
              color={"GrayText"}
              fontWeight={500}
              fontStyle={"italic"}
              textDecoration={"underline"}
            >
              Ingin memberi komen? Log masuk
            </Text>
          </Link>
        </SignedOut>
        <ImageModal open={open} setOpen={setOpen} image={d.image} />
      </Box>
    </Card>
  );
}
