import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req = NextRequest, { params }) {
  const id = params.id;
  const { like, dislike } = await req.json();

  try {
    const updateListing = await prisma.listing.update({
      where: {
        id: id,
      },
      data: {
        like: like,
        dislike: dislike,
      },
    });

    if (updateListing) {
      return NextResponse.json(updateListing);
    } else {
      return NextResponse.json({ message: "Failed" });
    }
  } catch (err) {
    return NextResponse.json({ message: err });
  }
}
