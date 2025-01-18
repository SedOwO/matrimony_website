import Profile from '../models/Profile.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await User.findOne({ email, isAdmin: true });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await Profile.find();
        res.json(users);
    } catch {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
};

export const approveProfile = async (req, res) => {
    const { profileId } = req.params;  // Profile ID should be in the URL params
    console.log('Approving profile with ID:', profileId);  // Log the profile ID for debugging

    try {
        const profile = await Profile.findByIdAndUpdate(
            profileId,
            { isApproved: true },
            { new: true }  // Return the updated profile
        );

        if (!profile) {
            console.log('Profile not found for ID:', profileId);
            return res.status(404).json({ message: 'Profile not found' });
        }

        console.log('Profile approved:', profile);
        res.json({ message: 'Profile approved', profile });
    } catch (error) {
        console.error('Error approving profile:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params; // Extracting userId from params

        // First, try to delete the profile associated with the user
        const profile = await Profile.findOneAndDelete({ userId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Then delete the user associated with the profile
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User and profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error });
    }
};


export const getMetrics = async (req, res) => {
    try {
        const totalProfiles = await Profile.countDocuments();
        const pendingProfiles = await Profile.countDocuments({ isApproved: false });
        res.json({ totalProfiles, pendingProfiles });
    } catch {
        res.status(500).json({ message: 'Server Error' });
    }
};
