import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import Profile from "../models/Profile.js";

// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            isAdmin: isAdmin || false,
        });

        // Create and link profile
        const profile = await Profile.create({
            userId: user._id,
        });

        // Link profile to the user
        user.profile = profile._id;
        await user.save();

        // Generate JWT token for authentication
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({
            message: 'User registered successfully',
            token,
        });
    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login an existing user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find and delete the user's profile if it exists
        const profile = await Profile.findOneAndDelete({ userId });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Delete the user account
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User and profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error });
    }
};