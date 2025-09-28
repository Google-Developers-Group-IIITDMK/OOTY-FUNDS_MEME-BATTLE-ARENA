import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import roomRoutes from './routes/roomRoutes.js';
import memeRoutes from './routes/memeRoutes.js';
import { connectDB } from './config/db.js';
import { socketHandler } from './sockets/socketHandler.js';
import authRoutes from './routes/authRoutes.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Serve uploads as static
app.use(`/${process.env.UPLOAD_DIR || 'uploads'}`, express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads')));


// Routes
app.use('/api/room', roomRoutes);
app.use('/api/meme', memeRoutes);
app.use('/api/auth', authRoutes);


// Basic health
app.get('/api/ping', (req, res) => res.json({ ok: true }));


// Start DB + server
const PORT = process.env.PORT || 4000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/meme-battle';


connectDB(MONGO_URI).then(() => {
    socketHandler(io);


    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
});