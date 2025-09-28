import mongoose from 'mongoose';


const RoomSchema = new mongoose.Schema({
    roomCode: { type: String, required: true, unique: true },
    name: { type: String },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    memes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meme' }]
}, { timestamps: true });


export default mongoose.model('Room', RoomSchema);