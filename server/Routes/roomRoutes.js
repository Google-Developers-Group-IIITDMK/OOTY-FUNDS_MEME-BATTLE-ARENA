import express from 'express';
import { createRoom, joinRoom } from '../controllers/roomController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create', requireAuth, createRoom);
router.post('/join/:code', requireAuth, joinRoom);

export default router;