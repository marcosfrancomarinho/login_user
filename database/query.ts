import { iQueries, iResponse, SendSuccess } from "../interfaces/types";
import { CheckDatas } from "../error/validate";
import { ValidationError } from "@hapi/joi";
import User from "./table";
import bcrypt from 'bcrypt';

/**
 * Implementa as operações de consulta e manipulação de dados relacionados ao usuário.
 * Implementa a interface iQueries, que define métodos para buscar, inserir e autenticar usuários.
 */
export class Queries implements iQueries<iResponse, SendSuccess> {
    
    /**
     * Busca um usuário pelo nome.
     * @param name - Nome do usuário a ser pesquisado.
     * @returns - Um objeto que representa o usuário, com os atributos `email` e `password`.
     * @throws - Lança um erro se o nome for inválido ou se o usuário não for encontrado.
     */
    public async searchName(name: string): Promise<iResponse> {
        try {
            // Valida o nome usando Joi
            const { error } = CheckDatas.checkName(name) as { error: ValidationError };
            if (error) throw error;

            // Busca o usuário no banco de dados
            const response: iResponse | null = await User.findOne({
                where: { name: name },
                raw: true,
                attributes: ['email', 'password', 'email']
            });

            // Lança um erro se o usuário não for encontrado
            if (!response) {
                throw new Error('User not found');
            }

            return response as iResponse;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Busca um usuário pelo ID.
     * @param id - ID do usuário a ser pesquisado.
     * @returns - Um objeto que representa o usuário, com os atributos `email` e `password`.
     * @throws - Lança um erro se o ID for inválido ou se o usuário não for encontrado.
     */
    public async searchId(id: number): Promise<iResponse> {
        try {
            // Valida o ID usando Joi
            const { error } = CheckDatas.checkId(id) as { error: ValidationError };
            if (error) throw error;

            // Busca o usuário no banco de dados
            const response: iResponse | null = await User.findOne({
                where: { id: id },
                raw: true,
                attributes: ['email', 'password', 'email']
            });

            // Lança um erro se o usuário não for encontrado
            if (!response) {
                throw new Error('User not found');
            }

            return response as iResponse;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Insere um novo usuário no banco de dados.
     * @param name - Nome do usuário.
     * @param email - Email do usuário.
     * @param password - Senha do usuário.
     * @returns - Um objeto que indica se a operação foi bem-sucedida e uma mensagem de sucesso.
     * @throws - Lança um erro se os dados forem inválidos ou se houver um problema ao criar o usuário.
     */
    public async insertDb(name: string, email: string, password: string): Promise<SendSuccess> {
        const salt: string = await bcrypt.genSalt(14); // Gera um salt para criptografar a senha
        try {
            // Valida os dados de registro usando Joi
            const { error } = CheckDatas.validateSignUp(
                {
                    name,
                    email,
                    password
                }
            ) as { error: ValidationError };
            if (error) throw error;

            // Criptografa a senha
            const passwordCrypt: string = await bcrypt.hash(password, salt);

            // Cria o novo usuário no banco de dados
            await User.create({
                name: name,
                email: email,
                password: passwordCrypt
            });

            return {
                done: true,
                msg: 'User register success'
            } as SendSuccess;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Autentica um usuário usando email e senha.
     * @param email - Email do usuário.
     * @param password - Senha do usuário.
     * @returns - Um objeto que indica se a autenticação foi bem-sucedida e uma mensagem de sucesso.
     * @throws - Lança um erro se os dados forem inválidos, se o usuário não for encontrado ou se a senha estiver incorreta.
     */
    public async loginUser(email: string, password: string): Promise<SendSuccess> {
        try {
            // Valida os dados de login usando Joi
            const { error } = CheckDatas.validateLogin(
                {
                    email,
                    password
                }
            ) as { error: ValidationError };
            if (error) throw error;

            // Busca o usuário no banco de dados
            const response: iResponse | null = await User.findOne({
                where: { email: email },
                raw: true,
                attributes: ['email', 'password', 'email']
            });

            // Lança um erro se o usuário não for encontrado ou a senha estiver incorreta
            if (!response) {
                throw new Error('Email or password incorrect');
            }

            // Compara a senha fornecida com a senha armazenada
            const validate: boolean = await bcrypt.compare(password, response.password);
            if (!validate) {
                throw new Error('Email or password incorrect');
            }

            return {
                done: true,
                msg: 'Login success'
            } as SendSuccess;
        } catch (error) {
            throw error;
        }
    }
}
