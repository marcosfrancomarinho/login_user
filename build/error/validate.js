"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckDatas = void 0;
const joi_1 = __importDefault(require("@hapi/joi"));
var CheckDatas;
(function (CheckDatas) {
    function validateLogin(datas) {
        const schema = joi_1.default.object({
            email: joi_1.default.string().required().email().empty().trim().min(8),
            password: joi_1.default.string().required().empty().trim().min(8)
        });
        return schema.validate(datas);
    }
    CheckDatas.validateLogin = validateLogin;
    function validateSignUp(datas) {
        const schema = joi_1.default.object({
            name: joi_1.default.string().required().trim().empty().min(3),
            email: joi_1.default.string().required().email().trim().empty().min(8),
            password: joi_1.default.string().required().trim().empty().min(8)
        });
        return schema.validate(datas);
    }
    CheckDatas.validateSignUp = validateSignUp;
    function checkName(name) {
        const schema = joi_1.default.string().required().empty().trim().min(3);
        return schema.validate(name);
    }
    CheckDatas.checkName = checkName;
    function checkId(id) {
        const schema = joi_1.default.number().required().empty();
        return schema.validate(id);
    }
    CheckDatas.checkId = checkId;
    function checkPassword(password) {
        const schema = joi_1.default.string().required().empty().trim().min(8);
        return schema.validate(password);
    }
    CheckDatas.checkPassword = checkPassword;
})(CheckDatas || (exports.CheckDatas = CheckDatas = {}));
