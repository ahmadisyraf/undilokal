import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function POST(req = NextRequest) {
  const { userId } = auth();
  try {
    const { inputName, inputAddress, inputImage } = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const tempat = await prisma.listing.create({
      data: {
        name: inputName,
        address: inputAddress,
        image: inputImage,
        like: 0,
        dislike: 0,
        user: { connect: { id: user.id } },
      },
    });

    if (tempat) {
      return NextResponse.json(tempat, { status: 201 });
    } else {
      return NextResponse.json({ status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function GET() {
  try {
    const tempat = await prisma.listing.findMany({
      include: {
        user: {
          include: true
        },
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!tempat) {
      return NextResponse.json({ status: 400 });
    } else {
      return NextResponse.json(tempat, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
