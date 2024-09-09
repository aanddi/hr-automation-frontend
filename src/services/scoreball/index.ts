import dotenv from 'dotenv';
import { Response } from 'express';
import { RequestWithBody } from 'src/shared/types/request.type';
import { ScoreballRequestBody } from './scoreball.interface';

dotenv.config();

export const ScoreballService = {
   async getAnalyzeListCandidates(req: RequestWithBody<ScoreballRequestBody>, res: Response) {
      const { resumes } = req.body;

      const listCandidates = await getScoreball(resumes);

      return res.json({ listCandidates });
   }
};

const getScoreball = async (resumes: any) => {
   // отправка данных в gpt ассистента для анализа резюме =>
   // сохранение полученных данных в бд
   return 'Список кандидатов';
};
