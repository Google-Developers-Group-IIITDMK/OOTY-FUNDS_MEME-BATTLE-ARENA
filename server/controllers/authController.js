import User from '../models/user.js';
import jwt from 'jsonwebtoken';


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