// src/sockets/socketHandler.js
import Room from '../models/Room.js';
import Meme from '../models/Meme.js';

let ioRef;

export const socketHandler = (io) => {
  ioRef = io;

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('room:join', async ({ roomCode, username }) => {
      try {
        const room = await Room.findOne({ roomCode }).populate('players', 'username avatar');
        if (!room) return socket.emit('error', { message: 'Room not found' });

        socket.join(roomCode);
        socket.to(roomCode).emit('room:joined', { username, socketId: socket.id });

        const memes = await Meme.find({ room: room._id }).populate('owner', 'username avatar');
        socket.emit('room:data', { room: { roomCode: room.roomCode, players: room.players }, memes });
      } catch (err) {
        console.error('room:join error', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
};

export const getIO = () => {
  if (!ioRef) throw new Error('Socket.io not initialized');
  return ioRef;
};