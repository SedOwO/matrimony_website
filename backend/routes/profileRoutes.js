import express from 'express';
import {
    completeProfile,
    getProfile,
    updateProfile,
    deleteProfile,
} from '../controllers/profileController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

// Create or Initialize Profile
router.post('/', protect, completeProfile);

// Get Profile by User ID
router.get('/:userId', protect, getProfile);

// Update Profile
router.put('/:userId', protect, updateProfile);

// Delete Profile
router.delete('/:userId', protect, deleteProfile);

export default router;
