import express from 'express';
import { uploadMeme, voteMeme} from '../controllers/memeController.js';

const router = express.Router();

router.post('/upload', uploadMeme);
router.post('/vote', voteMeme)

export default router;