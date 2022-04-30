"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeveralToDoSchema = exports.searchToDoByFilterSchema = exports.updateToDoStatusSchema = exports.updateToDoDueDateSchema = exports.createSeveralToDoSchema = exports.createOneToDoSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createOneToDoSchema = joi_1.default.object({
    title: joi_1.default.string().max(100).required(),
    description: joi_1.default.string().max(500),
    status: joi_1.default.string().valid("in_progress", "done"),
    dueDate: joi_1.default.date(),
});
exports.createSeveralToDoSchema = joi_1.default.array().items(exports.createOneToDoSchema);
exports.updateToDoDueDateSchema = joi_1.default.object({
    dueDate: joi_1.default.date().required(),
});
exports.updateToDoStatusSchema = joi_1.default.object({
    status: joi_1.default.date().valid("in_progress", "done").required(),
});
exports.searchToDoByFilterSchema = joi_1.default.object({
    status: joi_1.default.string().valid("in_progress", "done"),
    dueDate: joi_1.default.object({
        specificDate: joi_1.default.date(),
        range: joi_1.default.object({
            from_date: joi_1.default.date(),
            to_date: joi_1.default.date(),
        }),
    }),
});
exports.getSeveralToDoSchema = joi_1.default.object({
    ids: joi_1.default.array().items(joi_1.default.string()),
});
