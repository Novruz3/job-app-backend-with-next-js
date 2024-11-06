import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const response = NextResponse.json(
      { message: "Logout successfully" },
      { status: 200 }
    );
    response.cookies.set("token", "", { maxAge: 0 });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
