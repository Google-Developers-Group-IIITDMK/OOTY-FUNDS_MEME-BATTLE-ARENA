import express from 'express';
import { createRoom, joinRoom } from '../controllers/roomController.js';

const router = express.Router();

router.post('/create', createRoom);
router.post('/join/:code', joinRoom);

export default router;