import dotenv from 'dotenv';
dotenv.config();
export const ScoreballService = {
    async getAnalyzeListCandidates(req, res) {
        const { resumes } = req.body;
        const listCandidates = await getScoreball(resumes);
        return res.json({ listCandidates });
    }
};
const getScoreball = async (resumes) => {
    // отправка данных в gpt ассистента для анализа резюме =>
    // сохранение полученных данных в бд
    return 'Список кандидатов';
};
