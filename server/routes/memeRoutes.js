import express from 'express';
import { uploadMeme, voteMeme} from '../controllers/memeController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/upload', requireAuth, uploadMeme);
router.post('/vote', requireAuth, voteMeme)

export default router;