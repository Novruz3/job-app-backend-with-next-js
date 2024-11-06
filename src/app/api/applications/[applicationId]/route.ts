import { validateJWT } from "@/helpers/validateJWT";
import Application from "@/models/applicationModel";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest, {params} : any) => {
  try {
    await validateJWT(request);
    const reqBody = await request.json()
    const application = await Application.findByIdAndUpdate(params.applicationId, reqBody, {
      new : true,
      runValidators : true
    });
    if (!application) {
      throw new Error("Application not found");
    }
    return NextResponse.json({
      message: "Application updated successfully",
      data: application,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
