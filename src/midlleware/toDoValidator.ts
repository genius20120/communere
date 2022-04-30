import { NextFunction, Request, Response } from "express";
import { HttpException } from "../errorHandling/httpException";
import {
  createOneToDoSchema,
  createSeveralToDoSchema,
  getSeveralToDoSchema,
  searchToDoByFilterSchema,
  updateToDoDueDateSchema,
  updateToDoStatusSchema,
} from "../schema/toDo.schema";

export function createOneToDoValidate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const validateSchema = createOneToDoSchema.validate(request.body);
  if (validateSchema.error)
    next(new HttpException(400, validateSchema.error.details[0].message));
  next();
}
export function createSeveralToDoValidate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const validateSchema = createSeveralToDoSchema.validate(request.body);
  if (validateSchema.error)
    next(new HttpException(400, validateSchema.error.details[0].message));
  next();
}
export function updateToDoDueDateValidate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const validateSchema = updateToDoDueDateSchema.validate(request.body);
  if (validateSchema.error)
    next(new HttpException(400, validateSchema.error.details[0].message));
  next();
}
export function updateToDoStatusValidate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const validateSchema = updateToDoStatusSchema.validate(request.body);
  if (validateSchema.error)
    next(new HttpException(400, validateSchema.error.details[0].message));
  next();
}
export function searchToDoByFilterValidate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const validateSchema = searchToDoByFilterSchema.validate(request.body);
  if (validateSchema.error)
    next(new HttpException(400, validateSchema.error.details[0].message));
  next();
}
export function getSeveralToDoValidate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const validateSchema = getSeveralToDoSchema.validate(request.body);
  if (validateSchema.error)
    next(new HttpException(400, validateSchema.error.details[0].message));
  next();
}
