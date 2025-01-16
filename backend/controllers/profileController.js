import Profile from '../models/Profile.js';


export const completeProfile = async (req, res) => {
    const { userId } = req.user; // Extract userId from authenticated user
    const profileData = req.body; // Profile details sent in the request body

    try {
        // Update the profile with the provided data
        const updatedProfile = await Profile.findOneAndUpdate(
            { userId },
            { $set: profileData },
            { new: true } // Return the updated document
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            profile: updatedProfile,
        });
    } catch (error) {
        console.error('Error in completeProfile:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
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
