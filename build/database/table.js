"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("./connect"));
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    _id;
    _name;
    _email;
    _password;
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get email() {
        return this._email;
    }
    set email(value) {
        this._email = value;
    }
    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Email já cadastrado',
            name: 'email unique'
        },
        validate: {
            isEmail: {
                msg: 'O email informado é inválido.'
            },
            notEmpty: {
                msg: 'O email não pode estar vazio.'
            }
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O nome não pode estar vazio.'
            }
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'A senha não pode estar vazia.'
            }
        }
    }
}, {
    sequelize: connect_1.default,
    modelName: 'User',
    timestamps: true,
    tableName: 'users'
});
exports.default = User;
