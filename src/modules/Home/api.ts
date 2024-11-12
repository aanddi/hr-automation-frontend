import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import ApiTags from '@common/api/services/ApiTags';
import { scoreballService } from '@common/api/services/scoreball';
import { ICreateScoreball } from '@common/api/services/scoreball/type';
import { searchService } from '@common/api/services/search';

const useResumes = (params: string) => {
  return useQuery({
    queryKey: [ApiTags.GET_RESUMES, params],
    queryFn: async () => {
      return searchService.getResumes(params.toString());
    },
  });
};

const useAnalyzeResumes = () => {
  return useMutation({
    mutationKey: [ApiTags.CREATE_ANALYZE],
    mutationFn: async (data: ICreateScoreball) => {
      const body = {
        resumes: data.items,
        title: data.title,
        isDeepScoring: data.isDeepScoring,
      };
      const response = await toast.promise(scoreballService.createScoreball(body), {
        loading: 'Анализ списка резюме...',
        success: 'Анализ успешно проведен и сохранен',
        error: 'Ошибка. Анализ провалился',
      });
      return response.data;
    },
  });
};

export { useResumes, useAnalyzeResumes };
