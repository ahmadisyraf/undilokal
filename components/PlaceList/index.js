"use client";

import {
  Box,
  Text,
  Flex,
  Stack,
  RadioGroup,
  Radio,
  Textarea,
  List,
  ListItem,
  ListIcon,
  Button,
  Spacer,
  Link,
  Avatar,
  Divider,
  Image,
  AspectRatio,
  Card,
} from "@chakra-ui/react";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useObjectStore from "@/store/undi";
import { FaComment } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const schema = yup.object({
  inputComment: yup.string().required("Komen perlu di isi"),
});

export default function PlaceList({ d }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { objects, addObject } = useObjectStore();

  const userInteracted = objects.some((obj) => obj.id === d.id);
  const userInteractedObject = objects.find((obj) => obj.id === d.id);

  const [value, setValue] = useState(0);
  const [stateValue, setStateValue] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userInteracted === true) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [userInteracted]);

  useEffect(() => {
    if (userInteractedObject) {
      setStateValue(userInteractedObject.value);
    }
  }, [userInteractedObject]);

  const router = useRouter();

  const handleLikeStatusChange = async (value) => {
    let data = {};

    setValue(value);

    if (value === "1") {
      data = {
        like: d.like + 1,
        dislike: d.dislike,
      };
    } else if (value === "2") {
      data = {
        like: d.like,
        dislike: d.dislike + 1,
      };
    }

    try {
      const loadingToast = toast.loading("Sila tunggu");
      setIsLoading(true);
      const response = await fetch(`/api/tempat/${d.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Berjaya disimpan", { id: loadingToast });
        const res = await response.json();
        console.log(res);
        router.refresh();
        setIsLoading(false);
        addObject({
          id: d.id,
          value: value,
        });
      } else {
        toast.error("Gagal disimpan", { id: loadingToast });
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Gagal disimpan", { id: loadingToast });
      console.error("Error updating like status:", error);
      setIsLoading(false);
    }
  };

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
                    {d.user ? d.user.firstName + " " + d.user.lastName : "Anonymous"}
                  </Text>
                  <Text color={"GrayText"}>{d.user.email}</Text>
                </Box>
              </Flex>
            </Box>
          ) : null}
        </Box>
        {d.image ? (
          <Box pb={5} borderRadius={15} overflow={"hidden"}>
            <AspectRatio ratio={3 / 2} borderRadius={15} overflow={"hidden"}>
              <Image src={d.image} fit={"contain"} />
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
                <Text fontSize={"md"}>{d.address}</Text>
              </Flex>
            </Flex>
            {/* <Flex color={"GrayText"}>
            <Flex align={"center"}>
              <AiFillLike />
              <Text ml={2} fontSize={"md"}>
                {d.like}
              </Text>
            </Flex>
            <Flex align={"center"} ml={5}>
              <AiFillDislike />
              <Text ml={2} fontSize={"md"}>
                {d.dislike}
              </Text>
            </Flex>
          </Flex> */}
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
                            {d.user ? d.user.firstName + " " + d.user.lastName : "Anonymous"}
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
      </Box>
    </Card>
  );
}
