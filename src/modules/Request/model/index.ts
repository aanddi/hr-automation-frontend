import { useQuery } from '@tanstack/react-query';

import { RequestService } from '@common/api/services/request';

const useRequestsById = (id: number) => {
  return useQuery({
    queryKey: ['GET-REQUEST-ID'],
    queryFn: async () => RequestService.getRequestById(id),
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
