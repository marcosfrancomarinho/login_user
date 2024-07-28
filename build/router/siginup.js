"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controlles_1 = require("../controllers/controlles");
const router = express_1.default.Router();
router.post('/', controlles_1.User.signUp);
exports.default = router;
