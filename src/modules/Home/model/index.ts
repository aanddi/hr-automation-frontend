import { useMutation } from '@tanstack/react-query';
import { UseFormGetValues } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { SearchService } from '@common/api/services/search';
import { IResponseSearchGpt, ISearchGpt } from '@common/api/services/search/types';
import { useAppDispatch } from '@common/hooks';

import { setHistory } from '@store/slices/historys.slice';
import { setRequest } from '@store/slices/request.slice';

const useCreateSearch = (getValues: UseFormGetValues<ISearchGpt>) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: ISearchGpt) => {
      const response = await toast.promise(SearchService.getSearch(data), {
        loading: 'Поиск резюме...',
        success: 'Резюме найдены',
        error: 'Ошибка. Резюме не найдены',
      });

      return response.data;
    },
    onSuccess(data: IResponseSearchGpt) {
      const prompt = getValues();

      const state = {
        urlHhRuApi: data.urlHHruApi,
        prompt: prompt.description,
        resumes: data.listCandidates.items,
      };

      console.log(state)

      dispatch(setRequest(state));
      navigate('/candidates');
      dispatch(setHistory(prompt));
    },
  });
};

export default useCreateSearch;
