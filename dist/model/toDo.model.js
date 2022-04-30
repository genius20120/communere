"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const toDoSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
    },
    status: {
        type: String,
        enum: ["in_progress", "done"],
        default: "in_progress",
    },
    dueDate: {
        type: Date,
    },
    softDelete: {
        type: Boolean,
        default: false,
    },
});
toDoSchema.set("timestamps", true);
exports.ToDo = mongoose_1.default.model("Todo", toDoSchema);
