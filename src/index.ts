import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { toDoRouter, userRouter } from "./routes";
import { ErrorHandlingMiddleware } from "./errorHandling/httpException";
import { connectMongo } from "./db/mongoConnection";
import { authenticateUser } from "./midlleware/authentication";

dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
const port: string | number = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
connectMongo();
app.use("/toDo", authenticateUser);
app.use("/toDo", toDoRouter);
app.use("/user", userRouter);
app.use(ErrorHandlingMiddleware);
app.listen(port, () => {
  console.log(`server starts at port : ${port}`);
});
