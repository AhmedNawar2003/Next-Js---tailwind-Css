/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"; // Ensure correct import

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies(); // Await cookies properly
    cookieStore.delete("jwtToken");

    return NextResponse.json({ message: "logout" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
