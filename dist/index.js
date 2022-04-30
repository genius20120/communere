"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = require("./routes");
const httpException_1 = require("./errorHandling/httpException");
const mongoConnection_1 = require("./db/mongoConnection");
const authentication_1 = require("./midlleware/authentication");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
(0, mongoConnection_1.connectMongo)();
app.use("/toDo", authentication_1.authenticateUser);
app.use("/toDo", routes_1.toDoRouter);
app.use("/user", routes_1.userRouter);
app.use(httpException_1.ErrorHandlingMiddleware);
app.listen(port, () => {
    console.log(`server starts at port : ${port}`);
});
