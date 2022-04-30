import { Express, Request, Response, NextFunction, Router } from "express";
import {
  registerController,
  logInController,
} from "./controller/user.cotroller";
import { authenticateUser } from "./midlleware/authentication";
import { logInValidator, registerValidator } from "./midlleware/userValidator";
import {
  getOneToDo,
  getAllToDo,
  createOneToDo,
  createSeveralToDo,
  searchByFilterToDo,
  getSeveralToDo,
  updateDueDateToDo,
  updateStatusToDo,
  softDeleteToDo,
  hardDeleteToDo,
} from "./controller/todo.controller";
import {
  createOneToDoValidate,
  createSeveralToDoValidate,
  getSeveralToDoValidate,
  searchToDoByFilterValidate,
  updateToDoDueDateValidate,
  updateToDoStatusValidate,
} from "./midlleware/toDoValidator";
export const userRouter = Router();
userRouter.post("/register", [registerValidator], registerController);
userRouter.post("/logIn", [logInValidator], logInController);
export const toDoRouter = Router();
toDoRouter.get("/getOne/:id", getOneToDo);
toDoRouter.get("/get", getAllToDo);
toDoRouter.post("/createOne", [createOneToDoValidate], createOneToDo);
toDoRouter.post("/create", [createSeveralToDoValidate], createSeveralToDo);
toDoRouter.post(
  "/getByFilter",
  [searchToDoByFilterValidate],
  searchByFilterToDo
);
toDoRouter.post("/getSeveral", [getSeveralToDoValidate], getSeveralToDo);
toDoRouter.patch(
  "/dueDate/:id",
  [updateToDoDueDateValidate],
  updateDueDateToDo
);
toDoRouter.patch("/status/:id", [updateToDoStatusValidate], updateStatusToDo);
toDoRouter.delete("/softDelete/:id", softDeleteToDo);
toDoRouter.delete("/hardDelete/:id", hardDeleteToDo);
