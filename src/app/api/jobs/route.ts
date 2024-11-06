import { connectDB } from "@/config/dbConfig";
import { validateJWT } from "@/helpers/validateJWT";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const userId = await validateJWT(request);
    const reqBody = await request.json();
    const job = await Job.create({ ...reqBody, user: userId });
    return NextResponse.json({
      message: "Job created successfully",
      data: job,
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
    const searchText = searchParams.get("searchText");
    const location = searchParams.get("location");

    const filtersObject: any = {};
    if (user) {
      filtersObject["user"] = user;
    }
    if (searchText && searchText !== "") {
      filtersObject["title"] = { $regex: searchText, $options: "i" };
    }
    if (location && location !== "") {
      filtersObject["location"] = { $regex: location, $options: "i" };
    }
    const jobs = await Job.find(filtersObject).populate("user");
    return NextResponse.json({
      message: "Jobs fetched successfully",
      data: jobs,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
