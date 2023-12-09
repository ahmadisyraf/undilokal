import { NextResponse, NextRequest } from "next/server";
const { PrismaClient } = require("@prisma/client");
import { auth } from "@clerk/nextjs";

const prisma = new PrismaClient();

export async function POST(req = NextRequest, { params }) {
  const listingId = params.id;
  const { inputComment } = await req.json();
  const { userId } = auth();

  try {
    if (!prisma.comment) {
      throw new Error("Prisma client is not properly initialized.");
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    const newComment = await prisma.comment.create({
      data: {
        comment: inputComment,
        listing: { connect: { id: listingId } },
        user: { connect: { id: user.id } },
      },
    });

    if (newComment) {
      return NextResponse.json(newComment, { status: 201 });
    } else {
      return NextResponse.json({ status: 400 });
    }
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ health: "OK" }, { status: 200 });
}
