"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInController = exports.registerController = void 0;
const httpException_1 = require("../errorHandling/httpException");
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const _ = __importStar(require("lodash"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../model/user.model");
function signJwt(jwtPayload) {
    try {
        const token = jwt.sign(jwtPayload, config_1.default.JWT_SECRET, {
            expiresIn: config_1.default.JWT_EXPIRED_TIME,
        });
        return token;
    }
    catch (e) {
        throw e;
    }
}
function registerController(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = request.body;
            const newUser = new user_model_1.User(data);
            yield newUser.save();
            const jwtPayload = yield _.omit(Object.assign({}, newUser._doc), [
                "hashed_password",
                "__v",
            ]);
            const token = signJwt(jwtPayload);
            response.send({ token });
        }
        catch (e) {
            console.log(e);
            return next(new httpException_1.HttpException(500, "some thing wrong in server"));
        }
    });
}
exports.registerController = registerController;
function logInController(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = request.body;
            const user = yield user_model_1.User.findOne({ email });
            const validatePassword = bcrypt_1.default.compareSync(password, user.hashed_password);
            if (!validatePassword)
                return next(new httpException_1.HttpException(403, "wrong password"));
            const jwtPayload = yield _.omit(Object.assign({}, user._doc), [
                "hashed_password",
                "__v",
            ]);
            const token = signJwt(jwtPayload);
            return response.send({ token });
        }
        catch (e) {
            console.log(e);
            return next(new httpException_1.HttpException(500, "some thing wrong in server"));
        }
    });
}
exports.logInController = logInController;
