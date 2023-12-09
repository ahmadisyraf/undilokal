import { Center } from "@chakra-ui/react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <Center height={600}>
      <SignIn />
    </Center>
  );
}
