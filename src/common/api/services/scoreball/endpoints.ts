import { axiosHhAuthorizationInstance } from '@common/api/instances';

const createScoreball = async (body: any) => {
  return await axiosHhAuthorizationInstance.post<Promise<{ idRequest: number }>>(
    '/scoreball',
    body,
  );
};

export { createScoreball };
