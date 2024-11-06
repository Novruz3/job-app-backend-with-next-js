import { validateJWT } from "@/helpers/validateJWT";
import Job from "@/models/jobModel";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest, {params} : any) => {
  try {
    validateJWT(request);
    const job = await Job.findByIdAndDelete(params.jobId);
    if (!job) {
      throw new Error("Job not found");
    }
    return NextResponse.json({
      message: "Job deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const GET = async (request: NextRequest, {params} : any) => {
  try {
    validateJWT(request);
    const job = await Job.findById(params.jobId);
    if (!job) {
      throw new Error("Job not found");
    }
    return NextResponse.json({
      message: "Job fetched successfully",
      data: job,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest, {params} : any) => {
  try {
    await validateJWT(request);
    const reqBody = await request.json()
    const job = await Job.findByIdAndUpdate(params.jobId, reqBody, {
      new : true,
      runValidators : true
    });
    if (!job) {
      throw new Error("Job not found");
    }
    return NextResponse.json({
      message: "Job updated successfully",
      data: job,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
