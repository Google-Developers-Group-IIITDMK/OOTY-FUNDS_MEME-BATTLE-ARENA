import jwt from 'jsonwebtoken';
import User from '../models/user.js';


const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';


export const requireAuth = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ success: false, error: 'Unauthorized' });


    const token = auth.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        if (!user) return res.status(401).json({ success: false, error: 'Unauthorized' });
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Invalid token' });
    }
};