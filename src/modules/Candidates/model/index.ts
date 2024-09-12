import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { useNavigate } from "react-router-dom";
import { ScoreballService } from '@common/api/services/scoreball';

import { IRequestStore } from '@store/slices/request.slice';

const useAnalyzeResumes = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (request: IRequestStore) => {
      const response = await toast.promise(ScoreballService.createScoreball(request), {
        loading: 'Анализ списка резюме...',
        success: 'Анализ проведен успешно!',
        error: 'Ошибка. Анализ провалился',
      });

      return response.data;
    },
    onSuccess(data) {
      navigate(`/request/${data.idRequest}`);
    },
    onError(err: any) {
      console.error('Ошибка при выполнении метода => useAnalyzeResumes', err);
      return err.response?.data?.message;
    },
  });
};

export default useAnalyzeResumes;
