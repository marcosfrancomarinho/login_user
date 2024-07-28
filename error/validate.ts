import Joi, { ValidationResult } from "@hapi/joi";
import { iBody } from "../interfaces/types";

/**
 * Namespace para validações de dados.
 * @namespace CheckDatas
 */
export namespace CheckDatas {
    
    /**
     * Valida os dados de login do usuário.
     * @function validateLogin
     * @param {iBody} datas - Dados do usuário para validação de login.
     * @param {string} datas.email - Email do usuário. Deve ser um email válido e ter pelo menos 8 caracteres.
     * @param {string} datas.password - Senha do usuário. Deve ter pelo menos 8 caracteres.
     * @returns {ValidationResult} - Resultado da validação contendo os erros, se houver.
     * @throws {Error} - Lança um erro se o tipo de `datas` não for `iBody`.
     */
    export function validateLogin(datas: iBody): ValidationResult {
        const schema = Joi.object({
            email: Joi.string().required().email().empty().trim().min(8),
            password: Joi.string().required().empty().trim().min(8)
        });
        return schema.validate(datas);
    }

    /**
     * Valida os dados de cadastro do usuário.
     * @function validateSignUp
     * @param {iBody} datas - Dados do usuário para validação de cadastro.
     * @param {string} datas.name - Nome do usuário. Deve ter pelo menos 3 caracteres.
     * @param {string} datas.email - Email do usuário. Deve ser um email válido e ter pelo menos 8 caracteres.
     * @param {string} datas.password - Senha do usuário. Deve ter pelo menos 8 caracteres.
     * @returns {ValidationResult} - Resultado da validação contendo os erros, se houver.
     * @throws {Error} - Lança um erro se o tipo de `datas` não for `iBody`.
     */
    export function validateSignUp(datas: iBody): ValidationResult {
        const schema = Joi.object({
            name: Joi.string().required().empty().trim().min(3),
            email: Joi.string().required().email().empty().trim().min(8),
            password: Joi.string().required().empty().trim().min(8)
        });
        return schema.validate(datas);
    }

    /**
     * Valida o nome do usuário.
     * @function checkName
     * @param {string} name - Nome do usuário a ser validado.
     * @returns {ValidationResult} - Resultado da validação contendo os erros, se houver.
     * @throws {Error} - Lança um erro se o tipo de `name` não for `string`.
     */
    export function checkName(name: string): ValidationResult {
        const schema = Joi.string().required().empty().trim().min(3);
        return schema.validate(name);
    }

    /**
     * Valida o identificador (ID).
     * @function checkId
     * @param {number} id - Identificador a ser validado.
     * @returns {ValidationResult} - Resultado da validação contendo os erros, se houver.
     * @throws {Error} - Lança um erro se o tipo de `id` não for `number`.
     */
    export function checkId(id: number): ValidationResult {
        const schema = Joi.number().required().empty();
        return schema.validate(id);
    }

    /**
     * Valida a senha do usuário.
     * @function checkPassword
     * @param {string} password - Senha a ser validada.
     * @returns {ValidationResult} - Resultado da validação contendo os erros, se houver.
     * @throws {Error} - Lança um erro se o tipo de `password` não for `string`.
     */
    export function checkPassword(password: string): ValidationResult {
        const schema = Joi.string().required().empty().trim().min(8);
        return schema.validate(password);
    }
}
