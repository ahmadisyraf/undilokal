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
      return NextResponse.json(tempat);
    }
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}

export async function GET() {
  try {
    const tempat = await prisma.listing.findMany();

    if (!tempat) {
      return NextResponse.json({ message: "Tempat tidak wujud" });
    }

    return NextResponse.json(tempat);
  } catch (err) {
    return NextResponse.json({ error: err });
  }
}
