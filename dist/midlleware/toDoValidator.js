"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeveralToDoValidate = exports.searchToDoByFilterValidate = exports.updateToDoStatusValidate = exports.updateToDoDueDateValidate = exports.createSeveralToDoValidate = exports.createOneToDoValidate = void 0;
const httpException_1 = require("../errorHandling/httpException");
const toDo_schema_1 = require("../schema/toDo.schema");
function createOneToDoValidate(request, response, next) {
    const validateSchema = toDo_schema_1.createOneToDoSchema.validate(request.body);
    if (validateSchema.error)
        next(new httpException_1.HttpException(400, validateSchema.error.details[0].message));
    next();
}
exports.createOneToDoValidate = createOneToDoValidate;
function createSeveralToDoValidate(request, response, next) {
    const validateSchema = toDo_schema_1.createSeveralToDoSchema.validate(request.body);
    if (validateSchema.error)
        next(new httpException_1.HttpException(400, validateSchema.error.details[0].message));
    next();
}
exports.createSeveralToDoValidate = createSeveralToDoValidate;
function updateToDoDueDateValidate(request, response, next) {
    const validateSchema = toDo_schema_1.updateToDoDueDateSchema.validate(request.body);
    if (validateSchema.error)
        next(new httpException_1.HttpException(400, validateSchema.error.details[0].message));
    next();
}
exports.updateToDoDueDateValidate = updateToDoDueDateValidate;
function updateToDoStatusValidate(request, response, next) {
    const validateSchema = toDo_schema_1.updateToDoStatusSchema.validate(request.body);
    if (validateSchema.error)
        next(new httpException_1.HttpException(400, validateSchema.error.details[0].message));
    next();
}
exports.updateToDoStatusValidate = updateToDoStatusValidate;
function searchToDoByFilterValidate(request, response, next) {
    const validateSchema = toDo_schema_1.searchToDoByFilterSchema.validate(request.body);
    if (validateSchema.error)
        next(new httpException_1.HttpException(400, validateSchema.error.details[0].message));
    next();
}
exports.searchToDoByFilterValidate = searchToDoByFilterValidate;
function getSeveralToDoValidate(request, response, next) {
    const validateSchema = toDo_schema_1.getSeveralToDoSchema.validate(request.body);
    if (validateSchema.error)
        next(new httpException_1.HttpException(400, validateSchema.error.details[0].message));
    next();
}
exports.getSeveralToDoValidate = getSeveralToDoValidate;
