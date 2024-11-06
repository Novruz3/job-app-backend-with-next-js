import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Application from "@/models/applicationModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export const POST = async (request: NextRequest) => {
  try {
    await validateJWT(request);
    const reqBody = await request.json();
    const application = await Application.create(reqBody);
    return NextResponse.json({
      message: "You have successfully applied for this job",
      data: application,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  try {
    await validateJWT(request);
    const { searchParams } = new URL(request.url);
    const user = searchParams.get("user");
    const job = searchParams.get("job")

    const filtersObject: any = {};
    if (user) {
      filtersObject["user"] = user;
    }
    if (job) {
      filtersObject["job"] = job;
    }
    const applications = await Application.find(filtersObject)
      .populate("user")
      .populate("job");
    return NextResponse.json({
      message: "Applications fetched successfully",
      data: applications,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
