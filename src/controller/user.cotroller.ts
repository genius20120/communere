import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { HttpException } from "../errorHandling/httpException";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import * as _ from "lodash";
import bcrypt from "bcrypt";
import { User } from "../model/user.model";
import { UserRegistrationInterface } from "../schema/user.interface";

function signJwt(jwtPayload: any) {
  try {
    const token = jwt.sign(jwtPayload, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRED_TIME,
    });
    return token;
  } catch (e) {
    throw e;
  }
}
export async function registerController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const data: UserRegistrationInterface = request.body;
    const newUser = new User(data);
    await newUser.save();
    const jwtPayload = await _.omit({ ...newUser._doc }, [
      "hashed_password",
      "__v",
    ]);
    const token = signJwt(jwtPayload);
    response.send({ token });
  } catch (e) {
    console.log(e);
    return next(new HttpException(500, "some thing wrong in server"));
  }
}
export async function logInController(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    const validatePassword = bcrypt.compareSync(password, user.hashed_password);
    if (!validatePassword)
      return next(new HttpException(403, "wrong password"));
    const jwtPayload = await _.omit({ ...user._doc }, [
      "hashed_password",
      "__v",
    ]);
    const token = signJwt(jwtPayload);
    return response.send({ token });
  } catch (e) {
    console.log(e);
    return next(new HttpException(500, "some thing wrong in server"));
  }
}
