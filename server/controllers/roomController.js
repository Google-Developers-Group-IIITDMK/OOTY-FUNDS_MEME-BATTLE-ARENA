import Room from '../models/room.js';
import User from '../models/user.js';

export const createRoom = async (req, res) => {
    try {
        const { name, username } = req.body;
        const roomCode = (Math.random().toString(36).slice(2, 8)).toUpperCase();


        const room = new Room({ roomCode, name });


        // create or find user
        let user = null;
        if (username) {
            user = await User.findOne({ username });
            if (!user) user = await User.create({ username });
            room.players.push(user._id);
        }


        await room.save();
        return res.json({ success: true, room });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
};

export const joinRoom = async (req, res) => {
    try {
        const { code } = req.params;
        const { username } = req.body;

        const room = await Room.findOne({ roomCode: code });
        if (!room) return res.status(404).json({ success: false, error: 'Room not found' });


        let user = null;
        if (username) {
            user = await User.findOne({ username });
            if (!user) user = await User.create({ username });
            if (!room.players.includes(user._id)) room.players.push(user._id);
            await room.save();
        }


        const populated = await room.populate('players', 'username avatar score');
        return res.json({ success: true, room: populated });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
};