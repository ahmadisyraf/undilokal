import { Center, Skeleton } from "@chakra-ui/react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <Center height={600}>
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
      <ClerkLoading>
        <Skeleton width={400} height={450} borderRadius={15} />
      </ClerkLoading>
    </Center>
  );
}
