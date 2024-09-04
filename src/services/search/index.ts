import dotenv from 'dotenv';
import OpenAI from 'openai';
import axios from 'axios';
import fs from 'fs';
import { Response } from 'express';

import { SearchRequestBody } from './search.interface';
import { RequestWithBody } from 'src/shared/types/request.type';

dotenv.config();

const client = new OpenAI({
   apiKey: process.env.OPENAI_API_TOKEN
});

export const SearchService = {
   async getSearch(req: RequestWithBody<SearchRequestBody>, res: Response) {
      const { description } = req.body;

      const urlHHruApi = await getUrlHHru(description, res);

      const listCandidates = await getListСandidates(urlHHruApi as string, res);

      // const getScorballResult = await getScorball();

      return res.json({ urlHHruApi, listCandidates });
   }
};

const getUrlHHru = async (desc: string, res: Response) => {
   const assistanSearchtId = process.env.OPENAI_ASSISTANT_SEARCH_ID;

   const prompt = `На основе следующего описания вакансии: "${desc}", сформируй GET-запрос в формате JSON для API hh.ru для поиска резюме кандидатов.`;

   if (!assistanSearchtId) return res.status(500).json({ message: 'Assistant ID не установлен.' });
   if (!desc) return res.status(400).json({ message: 'Не указано описание' });

   try {
      const thread = await client.beta.threads.create();

      await client.beta.threads.messages.create(thread.id, {
         role: 'user',
         content: prompt
      });

      let run = await client.beta.threads.runs.createAndPoll(thread.id, {
         assistant_id: assistanSearchtId
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

         return generatedQuery;
      } else {
         console.log('Run status:', run.status);
         res.status(500).json({ message: 'Ошибка при создании запроса' });
      }
   } catch (error) {
      console.error('Ошибка при взаимодействии с OpenAI API:', error);
      res.status(500).json({ message: 'Ошибка при создании запроса' });
   }
};

const getListСandidates = async (url: string, res: Response) => {
   const accessToken = process.env.HHRU_API_ACCESS_TOKEN;

   try {
      const listCandidates = await axios.get(url, {
         params: {
            page: 1,
            per_page: 1
         },
         headers: {
            Authorization: `Bearer ${accessToken}`
         }
      });

      return listCandidates.data;
   } catch (error) {
      // console.error('Ошибка при получении списка:', error);
      // res.status(500).send('Ошибка при получении списка');
      return [];
   }
};

// const getScorball = async () => {};
