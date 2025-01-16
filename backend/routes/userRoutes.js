import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// POST routes for register and login
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
