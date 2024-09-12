import dotenv from 'dotenv';
import { useAssistant } from '../../shared/utils/useAssistant.js';
import { extractResumes } from '../../shared/utils/extractResumes.js';
import { RequestService } from '../request/index.js';
dotenv.config();
export const ScoreballService = {
    async getAnalyzeListCandidates(req, res) {
        const { resumes, prompt, urlHhRuApi } = req.body;
        const listCandidates = [];
        for (const item of resumes) {
            const response = await getScoreball(item, res);
            listCandidates.push(response);
        }
        const idSavedRequest = await RequestService.createRequests(listCandidates, urlHhRuApi, prompt);
        return res.json({ ...idSavedRequest, listCandidates });
    }
};
const getScoreball = async (resumes, res) => {
    const assistanScoreBallId = process.env.OPENAI_ASSISTANT_SCOREBALL_ID;
    if (!assistanScoreBallId)
        return res.status(500).json({ message: 'Server: Assistant ID не установлен.' });
    if (!resumes)
        return res.status(400).json({ message: 'Server: Нет списка резюме' });
    const body = JSON.stringify(resumes);
    const scoring = await useAssistant(assistanScoreBallId, body, res);
    if (typeof scoring === 'string') {
        return extractResumes(scoring);
    }
    return scoring;
};
