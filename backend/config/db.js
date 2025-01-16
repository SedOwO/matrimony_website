import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        console.log('Connecting to database...');
        
        // Ensure MONGO_URI is defined
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
        });

        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process with failure code
    }
};

export default connectDB;
