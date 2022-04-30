"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hardDeleteToDo = exports.softDeleteToDo = exports.updateStatusToDo = exports.updateDueDateToDo = exports.searchByFilterToDo = exports.createSeveralToDo = exports.createOneToDo = exports.getSeveralToDo = exports.getAllToDo = exports.getOneToDo = void 0;
const httpException_1 = require("../errorHandling/httpException");
const toDo_model_1 = require("../model/toDo.model");
const mongoose_1 = require("mongoose");
function queryGenerator(response, data) {
    const query = {
        $and: [
            {
                author: response.locals.user._id,
            },
            {
                softDelete: false,
            },
            ...data,
        ],
    };
    return query;
}
function getOneToDo(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = queryGenerator(response, [
                {
                    _id: request.params.id,
                },
            ]);
            const toDo = yield toDo_model_1.ToDo.findOne(query);
            return response.status(200).send(toDo);
        }
        catch (e) {
            console.log(e);
            return next(new httpException_1.HttpException(500, "some thing wrong in server"));
        }
    });
}
exports.getOneToDo = getOneToDo;
function getAllToDo(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = queryGenerator(response, []);
            const userToDo = yield toDo_model_1.ToDo.find(query);
            return response.status(200).send(userToDo);
        }
        catch (e) {
            console.log(e);
            return next(new httpException_1.HttpException(500, "some thing wrong in server"));
        }
    });
}
exports.getAllToDo = getAllToDo;
function getSeveralToDo(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = queryGenerator(response, [
                {
                    _id: {
                        $in: [...request.body.ids],
                    },
                },
            ]);
            const toDos = yield toDo_model_1.ToDo.find(query);
            return response.status(200).send(toDos);
        }
        catch (e) {
            console.log(e);
            return next(new httpException_1.HttpException(500, "some thing wrong in server"));
        }
    });
}
exports.getSeveralToDo = getSeveralToDo;
function createOneToDo(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const toDo = new toDo_model_1.ToDo(Object.assign(Object.assign({}, request.body), { userId: response.locals.user._id }));
            const result = yield toDo.save();
            return response.status(200).send(result);
        }
        catch (e) {
            console.log(e);
            return next(new httpException_1.HttpException(500, "some thing wrong in server"));
        }
    });
}
exports.createOneToDo = createOneToDo;
function createSeveralToDo(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const insertArray = request.body.map((elem) => {
                elem.userId = new mongoose_1.Types.ObjectId(response.locals.user._id);
                return elem;
            });
            const result = yield toDo_model_1.ToDo.insertMany([...insertArray]);
            return response.status(200).send(result);
        }
        catch (e) {
            console.log(e);
            return next(new httpException_1.HttpException(500, "some thing wrong in server"));
        }
    });
}
exports.createSeveralToDo = createSeveralToDo;
function searchByFilterToDo(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = request.body;
            const filters = [];
            if (data.status)
                filters.push({
                    status: data.status,
                });
            if (data.dueDate) {
                if (data.dueDate.specificDate)
                    filters.push({
                        dueDate: data.dueDate.specificDate,
                    });
                else if (data.dueDate.range)
                    filters.push({
                        dueDate: {
                            $gte: data.dueDate.range.from_date,
                            $lte: data.dueDate.range.to_date,
                        },
                    });
            }
            const query = queryGenerator(response, filters);
            const toDos = yield toDo_model_1.ToDo.find(query);
            return response.status(200).send(toDos);
        }
        catch (e) {
            console.log(e);
            return next(new httpException_1.HttpException(500, "some thing wrong in server"));
        }
    });
}
exports.searchByFilterToDo = searchByFilterToDo;
function updateDueDateToDo(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = queryGenerator(response, [{ _id: request.params.id }]);
            const result = yield toDo_model_1.ToDo.findOneAndUpdate(query, {
                $set: { dueDate: request.body.dueDate },
            });
            // problem of returning data didnt update
            result.dueDate = request.body.dueDate;
            return response.status(200).send(result);
        }
        catch (e) {
            console.log(e);
            return next(new httpException_1.HttpException(500, "some thing wrong in server"));
        }
    });
}
exports.updateDueDateToDo = updateDueDateToDo;
function updateStatusToDo(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = queryGenerator(response, [{ _id: request.params.id }]);
            const result = yield toDo_model_1.ToDo.findOneAndUpdate(query, {
                $set: { status: request.body.status },
            });
            // problem of returning data didnt update
            result.status = request.body.status;
            return response.status(200).send(result);
        }
        catch (e) {
            console.log(e);
            return next(new httpException_1.HttpException(500, "some thing wrong in server"));
        }
    });
}
exports.updateStatusToDo = updateStatusToDo;
function softDeleteToDo(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield toDo_model_1.ToDo.findOneAndUpdate({ _id: request.params.id }, { $set: { softDelete: true } });
            return response.status(200).send("soft deleted");
        }
        catch (e) {
            console.log(e);
            return next(new httpException_1.HttpException(500, "some thing wrong in server"));
        }
    });
}
exports.softDeleteToDo = softDeleteToDo;
function hardDeleteToDo(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield toDo_model_1.ToDo.findOneAndDelete({ _id: request.params.id });
            return response.status(200).send("hard deleted");
        }
        catch (e) {
            console.log(e);
            return next(new httpException_1.HttpException(500, "some thing wrong in server"));
        }
    });
}
exports.hardDeleteToDo = hardDeleteToDo;
