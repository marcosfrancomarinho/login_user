/**
 * Interface para o corpo da requisição de criação ou atualização de usuário.
 * @interface iBody
 */
export interface iBody {
    /**
     * Nome do usuário. Opcional.
     * @type {string}
     */
    name?: string;

    /**
     * Email do usuário.
     * @type {string}
     */
    email: string;

    /**
     * Senha do usuário.
     * @type {string}
     */
    password: string;
}

/**
 * Interface para os atributos de um usuário no banco de dados.
 * @interface UserAttributes
 */
export interface UserAttributes {
    /**
     * Identificador único do usuário.
     * @type {number}
     */
    id: number;

    /**
     * Nome do usuário.
     * @type {string}
     */
    name: string;

    /**
     * Email do usuário.
     * @type {string}
     */
    email: string;

    /**
     * Senha do usuário.
     * @type {string}
     */
    password: string;
}

/**
 * Interface para operações de banco de dados relacionadas ao usuário.
 * @interface iQueries
 * @template T - Tipo do retorno das buscas.
 * @template S - Tipo do retorno das operações de inserção e login.
 */
export interface iQueries<T, S> {
    /**
     * Busca um usuário pelo nome.
     * @param {string} name - Nome do usuário a ser pesquisado.
     * @returns {Promise<T>} - Uma promessa que resolve para o resultado da busca.
     * @throws {Error} - Lança um erro se ocorrer um problema durante a busca.
     */
    searchName(name: string): Promise<T>;

    /**
     * Busca um usuário pelo identificador (ID).
     * @param {number} id - Identificador único do usuário a ser pesquisado.
     * @returns {Promise<T>} - Uma promessa que resolve para o resultado da busca.
     * @throws {Error} - Lança um erro se ocorrer um problema durante a busca.
     */
    searchId(id: number): Promise<T>;

    /**
     * Insere um novo usuário no banco de dados.
     * @param {string} name - Nome do usuário.
     * @param {string} email - Email do usuário.
     * @param {string} password - Senha do usuário.
     * @returns {Promise<S>} - Uma promessa que resolve para o resultado da operação de inserção.
     * @throws {Error} - Lança um erro se ocorrer um problema durante a inserção.
     */
    insertDb(name: string, email: string, password: string): Promise<S>;

    /**
     * Realiza o login de um usuário.
     * @param {string} email - Email do usuário.
     * @param {string} password - Senha do usuário.
     * @returns {Promise<S>} - Uma promessa que resolve para o resultado da operação de login.
     * @throws {Error} - Lança um erro se ocorrer um problema durante o login.
     */
    loginUser(email: string, password: string): Promise<S>;
}

/**
 * Interface para a resposta de operações relacionadas ao usuário.
 * @interface iResponse
 */
export interface iResponse {
    /**
     * Nome do usuário.
     * @type {string}
     */
    name: string;

    /**
     * Email do usuário.
     * @type {string}
     */
    email: string;

    /**
     * Senha do usuário.
     * @type {string}
     */
    password: string;
}

/**
 * Interface para a resposta de sucesso em operações.
 * @interface SendSuccess
 */
export interface SendSuccess {
    /**
     * Indica se a operação foi bem-sucedida.
     * @type {boolean}
     */
    done: boolean;

    /**
     * Mensagem associada à operação.
     * @type {string}
     */
    msg: string;
}

export interface iObjectToken {
    email?: string;
    password?: string;
}
