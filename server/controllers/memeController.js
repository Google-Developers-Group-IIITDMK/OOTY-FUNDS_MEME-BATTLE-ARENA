import Meme from '../models/meme.js';
import Room from '../models/room.js';
import User from '../models/user.js'
export const uploadMeme = async (req, res) => {
    try {
        const { roomCode, username, imageURL } = req.body;

        const room = await Room.findOne({ roomCode });
        if (!room) return res.status(404).json({ success: false, error: 'Room not found' });

        let user = null;
        if (username) {
            user = await User.findOne({ username });
            if (!user) user = await User.create({ username });
        }


        const meme = await Meme.create({ imageURL, caption, owner: user?._id, room: room._id });
        room.memes.push(meme._id);
        await room.save();


        const populatedMeme = await meme.populate('owner', 'username avatar');


        // Return meme data for the client; socket will broadcast separately.
        return res.json({ success: true, meme: populatedMeme });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
};