"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queries = void 0;
const validate_1 = require("../error/validate");
const table_1 = __importDefault(require("./table"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class Queries {
    async searchName(name) {
        try {
            const { error } = validate_1.CheckDatas.checkName(name);
            if (error)
                throw error;
            const response = await table_1.default.findOne({
                where: { name: name },
                raw: true,
                attributes: ['email', 'password', 'email']
            });
            if (!response) {
                throw new Error('User not found');
            }
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async searchId(id) {
        try {
            const { error } = validate_1.CheckDatas.checkId(id);
            if (error)
                throw error;
            const response = await table_1.default.findOne({
                where: { id: id },
                raw: true,
                attributes: ['email', 'password', 'email']
            });
            if (!response) {
                throw new Error('User not found');
            }
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async insertDb(name, email, password) {
        const salt = await bcrypt_1.default.genSalt(14);
        try {
            const { error } = validate_1.CheckDatas.validateSignUp({
                name,
                email,
                password
            });
            if (error)
                throw error;
            const passwordCrypt = await bcrypt_1.default.hash(password, salt);
            await table_1.default.create({
                name: name,
                email: email,
                password: passwordCrypt
            });
            return {
                done: true,
                msg: 'User register success'
            };
        }
        catch (error) {
            throw error;
        }
    }
    async loginUser(email, password) {
        try {
            const { error } = validate_1.CheckDatas.validateLogin({
                email,
                password
            });
            if (error)
                throw error;
            const response = await table_1.default.findOne({
                where: { email: email },
                raw: true,
                attributes: ['email', 'password', 'email']
            });
            if (!response) {
                throw new Error('Email or password incorrect');
            }
            const validate = await bcrypt_1.default.compare(password, response.password);
            if (!validate) {
                throw new Error('Email or password incorrect');
            }
            return {
                done: true,
                msg: 'Login success'
            };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.Queries = Queries;
