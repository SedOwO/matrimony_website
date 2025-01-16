import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import { getAllUsers, approveProfile, deleteUser, adminLogin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', adminLogin);

// Route to get all user profiles (admin only)
router.get('/profiles', adminAuth, getAllUsers);

// Route to approve a user profile (admin only)
router.put('/profiles/:profileId/approve', adminAuth, approveProfile);

// Route to delete a user profile (admin only)
router.delete('/profiles/:profileId', adminAuth, deleteUser);

export default router;
