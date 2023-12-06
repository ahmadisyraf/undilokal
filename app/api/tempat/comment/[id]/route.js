import { NextResponse, NextRequest } from "next/server";
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function POST(req = NextRequest, { params }) {
  const listingId = params.id;
  const { inputComment } = await req.json();

  try {
    if (!prisma.comment) {
      throw new Error("Prisma client is not properly initialized.");
    }

    const newComment = await prisma.comment.create({
      data: {
        comment: inputComment,
        listing: { connect: { id: listingId } },
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
