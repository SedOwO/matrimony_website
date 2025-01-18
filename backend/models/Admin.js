import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the Admin schema
const adminSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
});

// Middleware to hash password before saving
adminSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) return next();

    try {
        // Hash the password with a salt round of 10
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare entered password with hashed password
adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the Admin model
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
