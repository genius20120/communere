"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInValidator = exports.registerValidator = void 0;
const httpException_1 = require("../errorHandling/httpException");
const user_schema_1 = require("../schema/user.schema");
function registerValidator(request, response, next) {
    const validateSchema = user_schema_1.userRegistrationSchema.validate(request.body);
    if (validateSchema.error)
        next(new httpException_1.HttpException(400, validateSchema.error.details[0].message));
    next();
}
exports.registerValidator = registerValidator;
function logInValidator(request, response, next) {
    const validateSchema = user_schema_1.userLogInSchema.validate(request.body);
    if (validateSchema.error)
        next(new httpException_1.HttpException(400, validateSchema.error.details[0].message));
    next();
}
exports.logInValidator = logInValidator;
