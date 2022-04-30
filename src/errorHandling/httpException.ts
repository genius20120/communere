import { NextFunction, Request, Response } from "express";

export class HttpException extends Error {
  status: number;
  constructor(status: number, message?: string) {
    super();
    this.status = status;
    if (message) this.message = message;
  }
}
export function ErrorHandlingMiddleware(
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) {
  response.status(error.status).send(error.message);
}
