import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = '7d';

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username) return res.status(400).json({ success: false, error: 'username required' });


        const existing = await User.findOne({ username });
        if (existing) return res.status(400).json({ success: false, error: 'username already taken' });


        const user = new User({ username, email, password });
        await user.save();


        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return res.json({ success: true, user: { id: user._id, username: user.username, avatar: user.avatar, score: user.score }, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ success: false, error: 'username and password required' });


        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ success: false, error: 'invalid credentials' });


        const ok = await user.comparePassword(password);
        if (!ok) return res.status(400).json({ success: false, error: 'invalid credentials' });


        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return res.json({ success: true, user: { id: user._id, username: user.username, avatar: user.avatar, score: user.score }, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
};