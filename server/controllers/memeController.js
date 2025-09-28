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

export const voteMeme = async (req, res) => {
    try {
        const { memeId, username } = req.body;
        const meme = await Meme.findById(memeId).populate('room');
        if (!meme) return res.status(404).json({ success: false, error: 'Meme not found' });


        let user = null;
        if (username) {
            user = await User.findOne({ username });
            if (!user) user = await User.create({ username });
        }


        // Prevent double voting by same user
        if (user && meme.voters.includes(user._id)) {
            return res.status(400).json({ success: false, error: 'Already voted' });
        }


        if (user) meme.voters.push(user._id);
        meme.votes += 1;
        await meme.save();


        // Update owner's score if owner exists
        if (meme.owner) {
            const owner = await User.findById(meme.owner);
            if (owner) {
                owner.score = (owner.score || 0) + 1;
                await owner.save();
            }
        }


        // Recompute top memes in the room for leaderboard emit
        const roomId = meme.room._id;
        const topMemes = await Meme.find({ room: roomId }).sort({ votes: -1 }).limit(10).populate('owner', 'username avatar');


        return res.json({ success: true, meme, leaderboard: topMemes });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
};