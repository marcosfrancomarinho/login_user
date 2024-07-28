import { UserAttributes } from '../interfaces/types';
import sequelize from './connect';
import { DataTypes, Model, Optional } from 'sequelize';

/**
 * Interface que estende `Optional` para `UserAttributes`, permitindo a ausência da propriedade `id` durante a criação de novos usuários.
 */
interface UserCreateAttributes extends Optional<UserAttributes, 'id'> { }

/**
 * Classe que representa o modelo `User` no banco de dados.
 * Estende a classe `Model` do Sequelize e implementa a interface `UserAttributes`.
 */
class User extends Model<UserAttributes, UserCreateAttributes> implements UserAttributes {
    
    /**
     * ID do usuário (campo privado).
     */
    private _id!: number;

    /**
     * Nome do usuário (campo privado).
     */
    private _name!: string;

    /**
     * Email do usuário (campo privado).
     */
    private _email!: string;

    /**
     * Senha do usuário (campo privado).
     */
    private _password!: string;

    /**
     * Obtém o ID do usuário.
     * @returns - ID do usuário.
     */
    public get id(): number {
        return this._id;
    }

    /**
     * Define o ID do usuário.
     * @param value - Novo valor para o ID do usuário.
     */
    public set id(value: number) {
        this._id = value;
    }

    /**
     * Obtém o nome do usuário.
     * @returns - Nome do usuário.
     */
    public get name(): string {
        return this._name;
    }

    /**
     * Define o nome do usuário.
     * @param value - Novo valor para o nome do usuário.
     */
    public set name(value: string) {
        this._name = value;
    }

    /**
     * Obtém o email do usuário.
     * @returns - Email do usuário.
     */
    public get email(): string {
        return this._email;
    }

    /**
     * Define o email do usuário.
     * @param value - Novo valor para o email do usuário.
     */
    public set email(value: string) {
        this._email = value;
    }

    /**
     * Obtém a senha do usuário.
     * @returns - Senha do usuário.
     */
    public get password(): string {
        return this._password;
    }

    /**
     * Define a senha do usuário.
     * @param value - Novo valor para a senha do usuário.
     */
    public set password(value: string) {
        this._password = value;
    }
}

/**
 * Inicializa o modelo `User` com os atributos e configurações especificados.
 * - `id`: Atributo do tipo `INTEGER`, auto-incrementado, chave primária.
 * - `email`: Atributo do tipo `STRING`, não nulo, único, com validações de formato e preenchimento.
 * - `name`: Atributo do tipo `STRING`, não nulo, com validação de preenchimento.
 * - `password`: Atributo do tipo `STRING`, não nulo, com validação de preenchimento.
 * 
 * Configura o modelo para usar o `sequelize` fornecido, define o nome do modelo e a tabela correspondente, e ativa o timestamp automático.
 */
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O nome não pode estar vazio.'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'A senha não pode estar vazia.'
            }
        }
    }
}, {
    sequelize: sequelize,
    modelName: 'User',
    timestamps: true,
    tableName: 'users'
});

export default User;
