"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlingMiddleware = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        if (message)
            this.message = message;
    }
}
exports.HttpException = HttpException;
function ErrorHandlingMiddleware(error, request, response, next) {
    response.status(error.status).send(error.message);
}
exports.ErrorHandlingMiddleware = ErrorHandlingMiddleware;
