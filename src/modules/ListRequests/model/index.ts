import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { requestService } from '@common/api/services/request';

const useRequests = () => {
  return useQuery({
    queryKey: ['GET-REQUESTS'],
    queryFn: async () => requestService.getAllList(),
  });
};

const useRequestsById = (id: number) => {
  return useQuery({
    queryKey: ['GET-REQUEST-ID'],
    queryFn: async () => requestService.getRequestById(id),
  });
};

const useDeleteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await toast.promise(requestService.deleteRequestById(id), {
        success: `Запрос №${id} успешно удален`,
        loading: 'Удаление...',
        error: 'Ошибка',
      });

      return response.data;
    },
    onSuccess() {
      queryClient.prefetchQuery({ queryKey: ['GET-REQUESTS'] });
    },
  });
};

export { useRequests, useRequestsById, useDeleteRequest };
