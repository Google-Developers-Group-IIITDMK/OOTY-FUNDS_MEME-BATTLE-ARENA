import Room from '../models/room.js';
import Meme from '../models/meme.js';


export const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('Socket connected:', socket.id);


        socket.on('room:join', async ({ roomCode, username }) => {
            try {
                const room = await Room.findOne({ roomCode }).populate('players', 'username avatar');
                if (!room) return socket.emit('error', { message: 'Room not found' });


                socket.join(roomCode);
                socket.to(roomCode).emit('room:joined', { username, socketId: socket.id });


                // Optionally send current memes
                const memes = await Meme.find({ room: room._id }).populate('owner', 'username avatar');
                socket.emit('room:data', { room: { roomCode: room.roomCode, players: room.players }, memes });
            } catch (err) {
                console.error('room:join error', err);
            }
        });


        socket.on('meme:submit', async (data) => {
            // data should contain meme object already created via REST upload (or you can implement binary upload via sockets)
            // We'll simply re-broadcast
            const { roomCode, meme } = data;
            io.in(roomCode).emit('meme:submitted', meme);
        });


        socket.on('vote:cast', async ({ roomCode, memeId, username }) => {
            try {
                // After REST vote call, broadcast the updated meme & leaderboard
                const meme = await Meme.findById(memeId).populate('owner', 'username avatar');
                const room = await Room.findOne({ roomCode });
                const leaderboard = await Meme.find({ room: room._id }).sort({ votes: -1 }).limit(10).populate('owner', 'username avatar');


                io.in(roomCode).emit('vote:cast', { meme, leaderboard });
                io.in(roomCode).emit('leaderboard:update', leaderboard);
            } catch (err) {
                console.error('vote:cast socket error', err);
            }
        });


        socket.on('disconnect', () => {
            console.log('Socket disconnected:', socket.id);
        });
    });
};