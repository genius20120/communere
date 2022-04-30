"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
function connectMongo() {
    const mongoConnectionString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`;
    mongoose_1.default.connection.on("error", console.log);
    return mongoose_1.default.connect(mongoConnectionString, { keepAlive: true });
}
exports.connectMongo = connectMongo;
