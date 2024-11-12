import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import ApiTags from '@common/api/services/ApiTags';
import { requestService } from '@common/api/services/request';

const useRequests = () => {
  return useQuery({
    queryKey: [ApiTags.GET_REQUESTS],
    queryFn: async () => requestService.getAllList(),
  });
};

const useDeleteRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [ApiTags.DELETE_REQUEST],
    mutationFn: async (id: number) => requestService.deleteRequestById(id),
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: [ApiTags.GET_REQUESTS] });
      toast.success('Запрос успешно удален');
    },
  });
};

export { useRequests, useDeleteRequest };
