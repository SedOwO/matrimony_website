import express from 'express';
import { registerUser, loginUser, deleteUser } from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js'; 


const router = express.Router();

// POST routes for register and login
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/user/:userId', protect, deleteUser);


export default router;
