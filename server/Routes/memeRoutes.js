import express from 'express';
import { uploadMeme} from '../controllers/memeController.js';

const router = express.Router();

router.post('/upload', uploadMeme);

export default router;