"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const validate_1 = require("../error/validate");
const query_1 = require("../database/query");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var User;
(function (User) {
    const query = new query_1.Queries();
    async function login(req, res) {
        try {
            const datas = req.body;
            const { error } = validate_1.CheckDatas.validateLogin(datas);
            if (error)
                throw error;
            const payload = { email: datas.email };
            const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '1h' });
            const response = await query.loginUser(datas.email, datas.password);
            res.setHeader('Authorization-Token', token);
            res.status(200).send({ response, token });
        }
        catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
    User.login = login;
    async function signUp(req, res) {
        try {
            const datas = req.body;
            const { error } = validate_1.CheckDatas.validateSignUp(datas);
            if (error)
                throw error;
            if (datas.name) {
                const response = await query.insertDb(datas.name, datas.email, datas.password);
                const payload = { email: datas.email };
                const token = jsonwebtoken_1.default.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '1h' });
                res.setHeader('Authorization-Token', token);
                res.status(200).send({ response, token });
            }
        }
        catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
    User.signUp = signUp;
    function verifyToken(req, res, next) {
        try {
            const token = req.headers['authorization-token'];
            console.log(token);
            if (!token) {
                throw new Error('Token não foi informado');
            }
            jsonwebtoken_1.default.verify(token, process.env.SECRET_TOKEN, function (error) {
                if (error) {
                    throw new Error('Token inválido');
                }
            });
            next();
        }
        catch (error) {
            res.status(401).send({ error: error.message });
        }
    }
    User.verifyToken = verifyToken;
    function prime(req, res) {
        res.status(200).json({
            menu: ['inicio', 'novidades', 'local', 'contanto'],
            message: 'seja bem vindo a nossa loja'
        });
    }
    User.prime = prime;
})(User || (exports.User = User = {}));
