import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carrega variáveis de ambiente do arquivo .env
dotenv.config()

// Cria uma instância do Sequelize para conectar ao banco de dados
const sequelize = new Sequelize(process.env.URL as string, { 
    dialect: 'postgres' // Define o dialeto do banco de dados como PostgreSQL
});

// Exporta a instância do Sequelize para uso em outras partes da aplicação
export default sequelize;
