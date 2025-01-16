import Profile from '../models/Profile.js';

// Create Profile
export const createProfile = async (req, res) => {
    try {
        const { userId } = req.user; // Assuming userId is available in req.user
        const existingProfile = await Profile.findOne({ userId });
        if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists' });
        }
        const profile = await Profile.create({ userId });
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create profile', error });
    }
};

// Get Profile
export const getProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const profile = await Profile.findOne({ userId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve profile', error });
    }
};

// Update Profile
export const updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const updates = req.body;
        const profile = await Profile.findOneAndUpdate({ userId }, updates, { new: true });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update profile', error });
    }
};

// Delete Profile
export const deleteProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        await Profile.findOneAndDelete({ userId });
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete profile', error });
    }
};
