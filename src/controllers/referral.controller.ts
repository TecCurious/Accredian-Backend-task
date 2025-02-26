import prisma from "../lib/prismaClient";
import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import ApiResponse from "../utils/apiResponse";
import sendReferralEmail from "../lib/services/sendMail";
import { asyncHandler } from "../utils/asyncHandler";

export const createReferral = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { referrerName, referrerEmail, refereeName, refereeEmail, program } =
    req.body;

  if (
    !referrerName ||
    !referrerEmail ||
    !refereeName ||
    !refereeEmail ||
    !program
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (referrerEmail === refereeEmail) {
    throw new ApiError(400, "Referrer and referee emails cannot be the same");
  }

  const referral = await prisma.referral.create({
    data: {
      referrerName,
      referrerEmail,
      refereeName,
      refereeEmail,
      program,
    },
  });

  if(process.env.NODE_ENV === "development"){
    console.log("Referral created successfully");
  }
  

  const referralInfo = {
    referrerName,
    referrerEmail,
    refereeName,
    refereeEmail,
    programName: program,
  };


    if(referral){
      await sendReferralEmail(referralInfo);
    }


  const response = new ApiResponse(
    201,
    "Referral created successfully and Email sent", 
    referral
  );
  res.json(response);
};


export const getReferrals = async (req: Request, res: Response) => {
  const referrals = await prisma.referral.findMany();
  const response = new ApiResponse(
    200,
    "Referrals retrieved successfully",
    referrals
  );
  res.json(response);
};
