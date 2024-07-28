"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const validate_1 = require("../error/validate");
const query_1 = require("../database/query");
var User;
(function (User) {
    const query = new query_1.Queries();
    async function login(req, res) {
        try {
            const datas = req.body;
            const { error } = validate_1.CheckDatas.validateLogin(datas);
            if (error)
                throw error;
            const response = await query.loginUser(datas.email, datas.password);
            res.status(200).send(response);
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
                res.status(200).send(response);
            }
        }
        catch (error) {
            res.status(400).send({ error: error.message });
        }
    }
    User.signUp = signUp;
})(User || (exports.User = User = {}));
