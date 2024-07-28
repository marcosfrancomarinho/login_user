import { Request, Response } from "express";
import { iBody, SendSuccess } from "../interfaces/types";
import { CheckDatas } from "../error/validate";
import { ValidationError } from "@hapi/joi";
import { Queries } from "../database/query";

/**
 * Namespace para encapsular as funções relacionadas ao usuário.
 * Inclui métodos para login e registro de usuários.
 */
export namespace User {

    // Instância da classe `Queries` para interagir com o banco de dados.
    const query: Queries = new Queries();

    /**
     * Controlador para o endpoint de login.
     * Valida os dados de login e tenta autenticar o usuário.
     * 
     * @param req - Objeto `Request` contendo os dados do login no corpo da requisição.
     * @param res - Objeto `Response` para enviar a resposta ao cliente.
     * 
     * @throws {ValidationError} Se os dados de login forem inválidos.
     * @throws {Error} Se ocorrer algum erro durante o login.
     * 
     * @returns {Promise<void>} Responde com um objeto `SendSuccess` se o login for bem-sucedido ou com um erro se falhar.
     */
    export async function login(req: Request, res: Response): Promise<void> {
        try {
            // Obtém os dados de login do corpo da requisição.
            const datas: iBody = req.body;

            // Valida os dados de login usando Joi.
            const { error } = CheckDatas.validateLogin(datas) as { error: ValidationError };
            if (error) throw error;

            // Tenta fazer login do usuário e obter o resultado.
            const response: SendSuccess = await query.loginUser(datas.email, datas.password);

            // Responde com o resultado do login.
            res.status(200).send(response);
        } catch (error) {
            // Responde com um erro se algo falhar.
            res.status(400).send({ error: (error as Error).message } as { error: string });
        }
    }

    /**
     * Controlador para o endpoint de registro de novos usuários.
     * Valida os dados de registro e tenta criar um novo usuário.
     * 
     * @param req - Objeto `Request` contendo os dados de registro no corpo da requisição.
     * @param res - Objeto `Response` para enviar a resposta ao cliente.
     * 
     * @throws {ValidationError} Se os dados de registro forem inválidos.
     * @throws {Error} Se ocorrer algum erro durante o registro.
     * 
     * @returns {Promise<void>} Responde com um objeto `SendSuccess` se o registro for bem-sucedido ou com um erro se falhar.
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

                // Responde com o resultado do registro.
                res.status(200).send(response);
            }
        } catch (error) {
            // Responde com um erro se algo falhar.
            res.status(400).send({ error: (error as Error).message } as { error: string });
        }
    }
}
