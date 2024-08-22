import OpenAI from 'openai';
import fs from 'fs';
const client = new OpenAI({
    apiKey: process.env.VITE_SERVER_API_TOKEN
});
export const SearchService = {
    async getSearch(req, res) {
        const description = req.body.description;
        const assistantId = 'asst_peoQpVmt93Hn6nn7CaCUeXEN';
        const prompt = `На основе следующего описания вакансии: "${description}", сформируй GET-запрос в формате JSON для API hh.ru.`;
        try {
            const params = {
                model: 'gpt-4o-mini',
                messages: [
                    { role: 'system', content: 'Ты помощник, который помогает с созданием запросов к hh.ru API.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 150,
                user: assistantId
            };
            const chatCompletion = await client.chat.completions.create(params);
            const generatedQuery = chatCompletion.choices[0].message?.content;
            fs.appendFileSync('requests.log', `Generated Query: ${generatedQuery}\n`);
            return res.json({ generatedQuery });
        }
        catch (error) {
            console.error('Ошибка при взаимодействии с OpenAI API:', error);
            res.status(500).json({ message: 'Ошибка при создании запроса' });
        }
    }
};
