import express from 'express';
import { RequestService } from '../services/request/index.js';

const router = express.Router();

router.get('/all', RequestService.getAllRequests);

router.get('/:id', RequestService.getRequestsById);

// router.post('/create', RequestService.createRequests);

router.delete('/delete/:id', RequestService.deleteRequestById);

export default router;
