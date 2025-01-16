import Profile from '../models/Profile.js';


export const completeProfile = async (req, res) => {
    const { userId } = req.user; // Now 'userId' should be available from the decoded JWT
    const profileData = req.body; // Profile details sent in the request body

    try {
        // Find or create the profile based on userId
        let updatedProfile = await Profile.findOne({ userId });

        if (!updatedProfile) {
            // Create a new profile if one doesn't exist
            updatedProfile = new Profile({ userId, ...profileData });
            await updatedProfile.save();
        } else {
            // Update the existing profile with new data
            updatedProfile = await Profile.findOneAndUpdate(
                { userId },
                { $set: profileData },
                { new: true }
            );
        }

        res.status(200).json({
            message: updatedProfile ? 'Profile updated successfully' : 'Profile created successfully',
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

