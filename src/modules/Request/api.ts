import { useQuery } from '@tanstack/react-query';

import ApiTags from '@common/api/services/ApiTags';
import { requestService } from '@common/api/services/request';

const useRequestsById = (id: number) => {
  return useQuery({
    queryKey: [ApiTags.GET_REQUESTS_BY_ID],
    queryFn: async () => requestService.getRequestById(id),
    select: ({ idRequest, info, resumes }) => {
      return {
        idRequest,
        info,
        resumes: resumes.sort((a, b) => b.scoreball - a.scoreball),
      };
    },
  });
};

export { useRequestsById };
