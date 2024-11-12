import { useQuery } from '@tanstack/react-query';

import { requestService } from '@common/api/services/request';

const useRequestsById = (id: number) => {
  return useQuery({
    queryKey: ['GET-REQUEST-ID'],
    queryFn: async () => requestService.getRequestById(id),
    select: ({ idRequest, info, resumes }) => {
      return {
        idRequest,
        info,
        resumes: resumes.sort((a: any, b: any) => b.scoreball - a.scoreball),
      };
    },
  });
};

export { useRequestsById };
