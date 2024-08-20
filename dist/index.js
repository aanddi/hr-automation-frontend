import 'reflect-metadata';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import SearchRoutes from './routes/search.route.js';
const PORT = process.env.PORT || 5000;
const app = express();
//========== CONFIG ==========//
dotenv.config();
app.use(cors());
app.use(express.json());
//========== ROUTES ==========//
const route = express.Router();
// установка глобального префикса всем маршрутам
app.use('/api', route);
route.use('/search', SearchRoutes);
//========== SERVER ==========//
app.listen(PORT, () => {
    console.log(`✓ Server: listening on port ${PORT}`);
});
