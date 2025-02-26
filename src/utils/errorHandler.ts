import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';
import { DatabaseError } from 'pg';
import ApiError from './apiError';
import { ErrorResponse } from '../lib/types';


  export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    console.error('Error:', err);
  

    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        message: 'Something went wrong',
      },
    };
  
    if (err instanceof ApiError) {
      errorResponse.error.message = err.message;
      errorResponse.error.code = err.statusCode;
      errorResponse.error.type = 'application_error';
      
      res.status(err.statusCode).json(errorResponse);
      return;
    }
  
    if (err instanceof DatabaseError) {
      errorResponse.error.type = 'database_error';
      errorResponse.error.message = err.message;
      errorResponse.error.details = {
        code: err.code,
        detail: err.detail
      };
      
      res.status(400).json(errorResponse);
      return;
    }

    if (err instanceof ValidationError) {
      errorResponse.error.type = 'validation_error';
      errorResponse.error.message = 'Validation failed';
      
      const details = err.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
        type: detail.type,
      }));
      
      errorResponse.error.details = details;
      
      res.status(400).json(errorResponse);
      return;
    }
  

    if (err instanceof SyntaxError && 'body' in err) {
      errorResponse.error.message = 'Invalid JSON';
      errorResponse.error.type = 'syntax_error';
      
      res.status(400).json(errorResponse);
      return;
    }
 
    res.status(500).json(errorResponse);
  };


  