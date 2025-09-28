import mongoose from 'mongoose';


const MemeSchema = new mongoose.Schema({
    imageURL: { type: String, required: true },
    caption: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
    votes: { type: Number, default: 0 },
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });


export default mongoose.model('Meme', MemeSchema);