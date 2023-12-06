import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req = NextRequest) {
  try {
    const { inputName, inputAddress } = await req.json();

    const tempat = await prisma.listing.create({
      data: {
        name: inputName,
        address: inputAddress,
        like: 0,
        dislike: 0,
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
        comments: true,
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