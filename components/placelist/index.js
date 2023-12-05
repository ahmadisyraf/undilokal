"use client";

import {
  Box,
  Avatar,
  Text,
  Flex,
  HStack,
  Stack,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function PlaceList({ d }) {
  const [value, setValue] = useState(0);
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
      } else {
        toast.error("Gagal disimpan", { id: loadingToast });
      }
    } catch (error) {
      toast.error("Gagal disimpan", { id: loadingToast });
      console.error("Error updating like status:", error);
    } 
  };

  return (
    <Box>
      <Flex>
        {/* <Avatar></Avatar> */}
        <Box ml={5}>
          <Text fontSize={"lg"} fontWeight={600}>
            {d.name}
          </Text>
          <Flex color={"GrayText"}>
            <Flex align={"center"}>
              <FaLocationDot />
              <Text ml={2} fontSize={"md"}>
                {d.address}
              </Text>
            </Flex>
          </Flex>
          <Flex color={"GrayText"}>
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
          </Flex>
          <RadioGroup
            mt={2}
            value={value}
            onChange={(value) => handleLikeStatusChange(value)}
          >
            <Stack direction={"row"}>
              <Radio value="1">Suka</Radio>
              <Radio value="2">Tidak Suka</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Flex>
    </Box>
  );
}
