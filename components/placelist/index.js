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
} from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
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
import { MdReport } from "react-icons/md";
import ReportModal from "../ReportModal";

const schema = yup.object({
  inputComment: yup.string().required("Komen perlu di isi"),
});

export default function PlaceList({ d }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);

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

  const handleReportModal = () => {
    setOpenReportModal(false);
  };

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
    <Box w={"100%"} position={"relative"}>
      <Flex w={"100%"}>
        {/* <Avatar></Avatar> */}
        <Box>
          <Text fontSize={"lg"} fontWeight={600}>
            {d.name}
          </Text>
          <Flex color={"GrayText"}>
            <Flex align={"center"}>
              {/* <FaLocationDot /> */}
              <Text fontSize={"md"}>{d.address}</Text>
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
            <Flex align={"center"} ml={5}>
              <MdReport />
              <Text ml={2} fontSize={"md"}>
                {"200"}
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
          <Box mt={3}>
            <Text>Komen :</Text>
            <List spacing={3} my={2}>
              {d.comments.map((d, index) => (
                <ListItem key={index}>
                  <ListIcon as={FaComment} color="gray.500" />
                  {d.comment}
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Flex>
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
        {/* In development */}
        {/* <Button
          size={"sm"}
          variant={"outline"}
          mt={3}
          ml={3}
          leftIcon={<MdReport size={15} />}
          onClick={() => setOpenReportModal(true)}
        >
          Laporkan Siaran
        </Button> */}
        <ReportModal isOpen={openReportModal} handleClose={handleReportModal} />
      </Box>
    </Box>
  );
}
