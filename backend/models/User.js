import mongoose from 'mongoose';

// User schema with a reference to Profile
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }, // Profile reference
    isAdmin: { type: Boolean, default: false }, // Admin role flag
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
