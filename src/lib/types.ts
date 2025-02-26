import { Request, Response, NextFunction } from "express"
export type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

 export interface ErrorResponse {
    success: boolean;
    error: {
      message: string;
      type?: string;
      code?: number;
      details?: any;
    };
  }


export  interface ReferralInfo {
    referrerName: string;
    referrerEmail: string;
    refereeName: string;
    refereeEmail: string;
    programName: string;
  }
  
