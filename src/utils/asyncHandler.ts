import { Request, Response, NextFunction } from "express";
import { AsyncFunction } from "../lib/types";

export const asyncHandler =
  (fun: AsyncFunction) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fun(req, res, next);
    } catch (error: unknown) {
        next(error);
    }
  };
