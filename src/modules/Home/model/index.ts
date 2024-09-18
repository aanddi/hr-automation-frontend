import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { HhruService } from '@common/api/services/hh';
import { ScoreballService } from '@common/api/services/scoreball';
import { ICreateScoreball } from '@common/api/services/scoreball/type';

const useResumes = (params: string) => {

  return useQuery({
    queryKey: ['GET-RESUMES', params],
    queryFn: async () => {
      return HhruService.getResumes(params.toString());
    },
    retry: 2,
    refetchOnMount: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
  });
};

const useAnalyzeResumes = () => {
  return useMutation({
    mutationFn: async (data: ICreateScoreball) => {
      const body = { resumes: data.items, title: data.title };
      const response = await toast.promise(ScoreballService.createScoreball(body), {
        loading: 'Анализ списка резюме...',
        success: 'Анализ успешно проведен и сохранен',
        error: 'Ошибка. Анализ провалился',
      });

      return response.data;
    },
    onError(err: any) {
      console.error('Ошибка при выполнении метода => useAnalyzeResumes', err);
      return err.response?.data?.message;
    },
  });
};

export { useResumes, useAnalyzeResumes };
