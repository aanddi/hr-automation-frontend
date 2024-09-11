import dotenv from 'dotenv';
import { useAssistant } from '../../shared/utils/useAssistant.js';
import { extractResumes } from '../../shared/utils/extractResumes.js';
dotenv.config();
export const ScoreballService = {
    async getAnalyzeListCandidates(req, res) {
        const { resumes } = req.body;
        const listCandidates = await getScoreball(resumes, res);
        return res.json({ listCandidates });
    }
};
const getScoreball = async (resumes, res) => {
    const assistanScoreBallId = process.env.OPENAI_ASSISTANT_SCOREBALL_ID;
    if (!assistanScoreBallId)
        return res.status(500).json({ message: 'Server: Assistant ID не установлен.' });
    if (!resumes)
        return res.status(400).json({ message: 'Server: Нет списка резюме' });
    const scoring = await useAssistant(assistanScoreBallId, resumes, res);
    if (typeof scoring === 'string') {
        return extractResumes(scoring);
    }
    return scoring;
};
