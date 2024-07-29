import express from 'express';
import { User } from '../controllers/controlles';

// Cria uma instância do roteador Express
const router = express.Router();

router.post('/', User.verifyToken, User.prime);

// Exporta o roteador para ser usado em outros módulos
export default router;
