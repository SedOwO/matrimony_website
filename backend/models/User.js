import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }, // Reference to Profile
    isAdmin: { type: Boolean, default: false }, // For admin roles
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
