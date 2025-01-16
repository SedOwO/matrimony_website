import Profile from '../models/Profile.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id, isAdmin: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } catch {
        res.status(500).json({ message: 'Server Error' });
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

export const approveProfile = async (req, res) => {
    const { userId } = req.body;
    try {
        const profile = await Profile.findByIdAndUpdate(userId, { isApproved: true });
        res.json({ message: 'Profile approved', profile });
    } catch {
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteUser = async (req, res) => {
    const { userId } = req.body;
    try {
        await Profile.findByIdAndDelete(userId);
        res.json({ message: 'User deleted' });
    } catch {
        res.status(500).json({ message: 'Server Error' });
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
