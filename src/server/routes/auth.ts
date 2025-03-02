import express from 'express';
import { login, logout, checkAuth } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/check', checkAuth);

export default router; 