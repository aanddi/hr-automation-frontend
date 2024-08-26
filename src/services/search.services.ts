import { Request, Response } from 'express';
import OpenAI from 'openai';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_TOKEN
});

export const SearchService = {
  async getSearch(req: Request, res: Response) {
    const description = req.body.description;
    const assistantId = 'asst_peoQpVmt93Hn6nn7CaCUeXEN';

    const prompt = `На основе следующего описания вакансии: "${description}", сформируй GET-запрос в формате JSON для API hh.ru для поиска резюме кандидатов.`;

    try {
      const thread = await client.beta.threads.create();

      await client.beta.threads.messages.create(thread.id, {
        role: 'user',
        content: prompt
      });

      let run = await client.beta.threads.runs.createAndPoll(thread.id, {
        assistant_id: assistantId,
      });

      if (run.status === 'completed') {
        const messages = await client.beta.threads.messages.list(run.thread_id);
        
        const assistantMessage = messages.data.reverse().find(msg => msg.role === 'assistant');

        let generatedQuery = '';

        if (assistantMessage && assistantMessage.content) {
          for (const block of assistantMessage.content) {
            if ('text' in block) {
              generatedQuery += block.text.value;
            }
          }
        }

        fs.appendFileSync('requests.log', `Generated Query: ${generatedQuery}\n`);

        return res.json({ generatedQuery });
      } else {
        console.log('Run status:', run.status);
        res.status(500).json({ message: 'Ошибка при создании запроса' });
      }
    } catch (error) {
      console.error('Ошибка при взаимодействии с OpenAI API:', error);
      res.status(500).json({ message: 'Ошибка при создании запроса' });
    }
  }
};
