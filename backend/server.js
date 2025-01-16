import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());  // To parse JSON request body
app.use(cors());  // Enable Cross-Origin Request Sharing

// Routes
app.use('/api/auth', userRoutes); // User authentication routes
app.use('/api/profile', profileRoutes); // Profile routes
app.use('/api/admin', adminRoutes); // Admin routes

// Server listening on port 5000
app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
});
