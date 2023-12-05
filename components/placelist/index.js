"use client";

import { Box, Text, Flex, Stack, RadioGroup, Radio } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useObjectStore from "@/store/undi";

export default function PlaceList({ d }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const { objects, addObject } = useObjectStore();

  const userInteracted = objects.some((obj) => obj.id === d.id);
  const userInteractedObject = objects.find((obj) => obj.id === d.id);

  const [value, setValue] = useState(0);
  const [stateValue, setStateValue] = useState(0);

  useEffect(() => {
    if (userInteracted === true) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [userInteracted]);

  useEffect(() => {
    if(userInteractedObject) {
      setStateValue(userInteractedObject.value);
    }
  }, [userInteractedObject])

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
            value={userInteractedObject ? stateValue : value}
            onChange={(value) => handleLikeStatusChange(value)}
          >
            <Stack direction={"row"}>
              <Radio value="1" isDisabled={isLoading || isDisabled}>
                Suka
              </Radio>
              <Radio value="2" isDisabled={isLoading || isDisabled}>
                Tidak Suka
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Flex>
    </Box>
  );
}
