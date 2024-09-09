import express from 'express';
import { ScoreballService } from '../services/scoreball/index.js';
const router = express.Router();
router.post('/', ScoreballService.getAnalyzeListCandidates);
export default router;
