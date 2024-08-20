import express from 'express'
import { SearchService } from '../services/search.services.js'

const router = express.Router()

router.post('/', SearchService.getSearch)

export default router
