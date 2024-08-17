import express, { Request, Response, NextFunction } from 'express';
import cors, { CorsOptions } from 'cors';
import routerLogin from '../router/login';
import routerSiginUp from '../router/siginup';
import routerPrime from '../router/prime';

// Cria uma instância do aplicativo Express
const app = express();

// Define a porta em que o servidor irá escutar
const port: number = parseInt(process.env.PORT ?? '3000', 10);

/**
 * Configuração CORS (Cross-Origin Resource Sharing).
 * @constant
 * @type {CorsOptions}
 * @default
 * @property {string} origin - Define as origens permitidas. '*' permite todas as origens.
 * @property {string[]} methods - Métodos HTTP permitidos. Aqui está configurado para permitir POST, GET, PUT e DELETE.
 * @property {string[]} allowedHeaders - Cabeçalhos permitidos nas requisições. Inclui 'Content-Type', 'Authorization' e 'authorization-token'.
 * @property {string[]} exposedHeaders - Cabeçalhos expostos que podem ser acessados na resposta. Inclui 'Authorization-Token'.
 */
const corsOptions: CorsOptions = {
    origin: '*', // ou 'http://localhost:3000'
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'authorization-token'], // Adiciona 'authorization-token'
    exposedHeaders: ['Authorization-Token']
};

// Middleware para interpretar o corpo das requisições como JSON
app.use(express.json());

// Middleware para configurar as opções de CORS
app.use(cors(corsOptions));

/**
 * Configura as rotas do aplicativo.
 * @function
 * @param {string} path - O prefixo da rota.
 * @param {Router} router - O roteador que gerencia as rotas para o prefixo especificado.
 */
app.use('/login', routerLogin); // Adiciona um prefixo para as rotas de login
app.use('/sigin', routerSiginUp); // Adiciona um prefixo para as rotas de signup
app.use('/prime', routerPrime);

/**
 * Middleware de tratamento de erros.
 * @function
 * @param {any} err - O objeto de erro que foi capturado.
 * @param {Request} req - O objeto de solicitação.
 * @param {Response} res - O objeto de resposta.
 * @param {NextFunction} next - Função para passar para o próximo middleware, se necessário.
 * @throws {Error} Loga o stack trace do erro no console e responde com um erro genérico.
 * @returns {void} Não retorna nenhum valor.
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack); // Loga o stack trace do erro no console
    res.status(500).json({ error: 'Something went wrong!' }); // Retorna uma resposta JSON com um erro genérico
});

// Inicializa o servidor e faz com que ele escute na porta especificada
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Loga a mensagem indicando que o servidor está rodando
});
