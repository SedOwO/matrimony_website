import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { getAllUsers, approveProfile, getUserById, deleteUser, adminLogin, getMetrics } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', adminLogin);

router.get('/profiles', adminAuth, getAllUsers);

router.get('/users/:id', getUserById);

router.put('/profiles/:profileId/approve', adminAuth, approveProfile);

router.delete('/users/:id', adminAuth, deleteUser);

router.get('/metrics', adminAuth, getMetrics);

export default router;
