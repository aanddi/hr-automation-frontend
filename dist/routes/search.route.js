import express from 'express';
import { SearchService } from '../services/search/index.js';
const router = express.Router();
router.post('/', SearchService.getSearch);
export default router;
