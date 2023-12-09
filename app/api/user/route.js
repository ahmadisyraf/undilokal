import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const isExist = await prisma.user.findFirst({
      where: {
        email: clerkUser.emailAddresses[0].emailAddress,
      },
    });

    if (isExist) {
      return NextResponse.json(
        { user: isExist, newUser: false },
        { status: 200 }
      );
    }

    const createUser = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
        image: clerkUser.imageUrl,
      },
    });

    if (!createUser) {
      return NextResponse.json(
        { message: "Failed to insert in db " },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { user: createUser, newUser: true },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(err.message);
  }
}
