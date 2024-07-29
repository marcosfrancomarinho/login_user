"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const login_1 = __importDefault(require("../router/login"));
const siginup_1 = __importDefault(require("../router/siginup"));
const prime_1 = __importDefault(require("../router/prime"));
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT ?? '3000', 10);
const corsOptions = {
    origin: '*',
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['authorization-token']
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
app.use('/login', login_1.default);
app.use('/sigin', siginup_1.default);
app.use('/prime', prime_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
