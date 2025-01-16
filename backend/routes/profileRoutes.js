import express from 'express';
import {
    completeProfile,
    getProfile,
    updateProfile,
    deleteProfile,
} from '../controllers/profileController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/complete', protect, completeProfile);

router.get('/:userId', protect, getProfile);

router.put('/:userId', protect, updateProfile);

router.delete('/:userId', protect, deleteProfile);

export default router;
