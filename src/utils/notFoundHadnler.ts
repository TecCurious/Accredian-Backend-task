import { Request, Response, NextFunction } from 'express';
import ApiError from './apiError';


export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const error = new ApiError(404,`Not found - ${req.originalUrl}`);
    next(error);
  };