import { Response, Request, NextFunction } from "express";
import { HttpException } from "../errorHandling/httpException";
import { userLogInSchema, userRegistrationSchema } from "../schema/user.schema";

export function registerValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const validateSchema = userRegistrationSchema.validate(request.body);
  if (validateSchema.error)
    next(new HttpException(400, validateSchema.error.details[0].message));
  next();
}
export function logInValidator(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const validateSchema = userLogInSchema.validate(request.body);
  if (validateSchema.error)
    next(new HttpException(400, validateSchema.error.details[0].message));
  next();
}
