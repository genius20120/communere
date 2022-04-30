"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../config/config"));
const Schema = mongoose_1.default.Schema;
exports.userSchema = new Schema({
    first_name: {
        type: String,
        required: false,
        default: null,
        maxlength: 50,
    },
    last_name: {
        type: String,
        required: false,
        default: null,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 50,
    },
    hashed_password: {
        type: String,
        required: true,
    },
});
exports.userSchema.set("timestamps", true);
exports.userSchema
    .virtual("password")
    .get(function () {
    return `${this.hashed_password}`;
})
    .set(function (password) {
    const hashed_password = this.encryptPassword(password);
    this.set({ hashed_password });
});
exports.userSchema.method({
    encryptPassword: function (password) {
        if (!password)
            return "";
        try {
            const bcryptSalt = config_1.default.BCRYPT_SALT;
            return bcrypt_1.default.hashSync(password, bcryptSalt);
        }
        catch (err) {
            return "";
        }
    },
});
exports.User = mongoose_1.default.model("User", exports.userSchema);
