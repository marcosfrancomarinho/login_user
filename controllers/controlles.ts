import { NextFunction, Request, Response } from "express";
import { iBody, iObjectToken, SendSuccess } from "../interfaces/types";
import { CheckDatas } from "../error/validate";
import { ValidationError } from "@hapi/joi";
import { Queries } from "../database/query";
import jwt from 'jsonwebtoken';

// Adiciona a propriedade 'token' à interface Request do Express.
// Isso permite que você adicione um token JWT ao objeto Request, se necessário.

export namespace User {

    // Instância da classe Queries para interagir com o banco de dados.
    const query: Queries = new Queries();

    /**
     * Controlador para o endpoint de login.
     * Valida os dados de login e tenta autenticar o usuário.
     * 
     * @param req - Objeto Request contendo os dados do login no corpo da requisição.
     * @param res - Objeto Response para enviar a resposta ao cliente.
     * 
     * @returns {Promise<void>} Responde com um objeto SendSuccess e um token JWT se o login for bem-sucedido, ou com um erro se falhar.
     */
    export async function login(req: Request, res: Response): Promise<void> {
        try {
            // Obtém os dados de login do corpo da requisição.
            const datas: iBody = req.body;

            // Valida os dados de login usando Joi.
            const { error } = CheckDatas.validateLogin(datas) as { error: ValidationError };
            if (error) throw error;

            // Cria um payload mais seguro e específico para o token JWT.
            // Aqui, apenas o email é incluído no payload do token.
            const payload: iObjectToken = { email: datas.email };

            // Gera um token JWT com o payload e a chave secreta, configurando uma expiração de 1 hora.
            const token: string = jwt.sign(
                payload,
                process.env.SECRET_TOKEN as string,
                { expiresIn:60 }
            );

            // Tenta fazer login do usuário e obter o resultado.
            const response: SendSuccess = await query.loginUser(datas.email, datas.password);

            // Define o token JWT no cabeçalho da resposta.
            res.setHeader('authorization-token', token);

            // Responde com o resultado do login e o token JWT.
            res.status(200).send({ response, token });
        } catch (error) {
            // Responde com um erro se algo falhar.
            res.status(400).send({ error: (error as Error).message });
        }
    }

    /**
     * Controlador para o endpoint de registro de novos usuários.
     * Valida os dados de registro e tenta criar um novo usuário.
     * Gera um token JWT após o sucesso do registro.
     * 
     * @param req - Objeto Request contendo os dados de registro no corpo da requisição.
     * @param res - Objeto Response para enviar a resposta ao cliente.
     * 
     * @returns {Promise<void>} Responde com um objeto SendSuccess e um token JWT se o registro for bem-sucedido, ou com um erro se falhar.
     */
    export async function signUp(req: Request, res: Response): Promise<void> {
        try {
            // Obtém os dados de registro do corpo da requisição.
            const datas: iBody = req.body;

            // Valida os dados de registro usando Joi.
            const { error } = CheckDatas.validateSignUp(datas) as { error: ValidationError };
            if (error) throw error;

            // Verifica se o nome do usuário foi fornecido.
            if (datas.name) {
                // Tenta criar um novo usuário e obter o resultado.
                const response: SendSuccess = await query.insertDb(
                    datas.name,
                    datas.email,
                    datas.password
                );

                // Cria um payload para o token JWT.
                // Aqui, apenas o email é incluído no payload do token.
                const payload: iObjectToken = { email: datas.email };

                // Gera um token JWT com o payload e a chave secreta, configurando uma expiração de 1 hora.
                const token: string = jwt.sign(
                    payload,
                    process.env.SECRET_TOKEN as string,
                    { expiresIn: '1h' }
                );

                // Define o token JWT no cabeçalho da resposta.
                res.setHeader('authorization-token', token);

                // Responde com o resultado do registro e o token JWT.
                res.status(200).send({ response, token });
            }
        } catch (error) {
            // Responde com um erro se algo falhar.
            res.status(400).send({ error: (error as Error).message });
        }
    }

    export function verifyToken(req: Request, res: Response, next: NextFunction): void {
        try {
            const token = req.headers['authorization-token'] as string | undefined;
            if (!token) {
                throw new Error('Token não foi informado');
            }
            jwt.verify(
                token,
                process.env.SECRET_TOKEN as string,
                function (error) {
                    if (error) {
                        throw new Error('Token inválido');
                    }
                }
            );
            next();
        } catch (error) {
            res.status(401).send({ error: (error as Error).message });
        }
    }
    export function prime(req: Request, res: Response): void {
        res.send('acesso privado');
    }
}
