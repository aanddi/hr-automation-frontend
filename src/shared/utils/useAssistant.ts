
import OpenAI from 'openai';
import dotenv from 'dotenv';
import { Response } from 'express';

dotenv.config();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_TOKEN
 });


export const useAssistant = async (assistanId: string, desc: string, res: Response) => {
    try {
       const thread = await client.beta.threads.create();
 
       await client.beta.threads.messages.create(thread.id, {
          role: 'user',
          content: desc
       });
 
       let run = await client.beta.threads.runs.createAndPoll(thread.id, {
          assistant_id: assistanId
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
          
          return generatedQuery;
       } else {
          console.log('Run status:', run.status);
          return res.status(500).json({ message: 'Server: Ошибка при создании запроса ассистенту. Метод => getUrlHHru' });
       }
    } catch (error) {
       console.error('Ошибка при взаимодействии с OpenAI API. Метод => getUrlHHru: ', error);
       return res.status(500).json({ message: 'Server: Ошибка при взаимодействии с OpenAI API. Метод => getUrlHHru' });
    }
 }