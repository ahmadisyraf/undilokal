"use client";

import { Box, Text, Flex, Spacer, Button } from "@chakra-ui/react";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Navigation() {
  const { isSignedIn, user } = useAuth();

  async function handleUser() {
    try {
      const response = await fetch("/api/user", {
        method: "GET",
      });

      if (response.ok) {
        const user = await response.json();
        if (user) {
          // console.log(user, "..user from database");
          console.log("sucess");
        }
      } else {
        console.error("Failed to fetch user data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  }

  useEffect(() => {
    if (isSignedIn) {
      console.log("lalu");
      handleUser();
    }
  }, [isSignedIn]);

  return (
    <Box px={5} py={4} position={"fixed"} width={"100%"} zIndex={1000} bgColor={"white"}>
      <Flex align={"center"}>
        <Link href={"/"}>
          <Text fontWeight={600} fontSize={"xl"}>
            Undi Lokal
          </Text>
        </Link>
        <Spacer />
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href={"/sign-in"}>
            <Button variant={"solid"} colorScheme={"blue"} size={"sm"}>
              Login
            </Button>
          </Link>
        </SignedOut>
      </Flex>
    </Box>
  );
}
