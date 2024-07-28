import express from 'express';
import { User } from '../controllers/controlles';

// Cria uma instância do roteador Express
const router = express.Router();

/**
 * Rota para o cadastro (signup) do usuário.
 * @name POST /signup
 * @function
 * @param {Request} req - O objeto de solicitação que contém informações sobre a requisição feita pelo cliente.
 * @param {Response} res - O objeto de resposta usado para enviar a resposta ao cliente.
 * @param {NextFunction} next - Função para passar para o próximo middleware, se necessário.
 * @throws {Error} Caso ocorra um erro durante o cadastro, o middleware de tratamento de erros pode capturá-lo e responder com uma mensagem de erro.
 * @returns {void} Não retorna nenhum valor diretamente. A resposta é enviada através do objeto `res`.
 */
router.post('/', User.signUp);

// Exporta o roteador para ser usado em outros módulos
export default router;
