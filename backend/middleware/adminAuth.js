import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) throw new Error(); // Check if the user has admin privileges
        req.admin = decoded; // Attach admin info to the request object
        next();
    } catch {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export default adminAuth;
