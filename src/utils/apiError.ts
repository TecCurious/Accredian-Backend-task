class ApiError extends Error {
    statusCode: number;
    message: string;
    error: any[] = [];
    stack?: string;
    constructor(statusCode: number, message: string, error: any[] = []) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.error = error;
      this.stack = new Error().stack;
      Error.captureStackTrace(this, this.constructor);
    }
 }

export default ApiError;


