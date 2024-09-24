import { axiosHhAuthorizationInstance } from '@common/api/instance';

export const ScoreballService = {
  async createScoreball(body: any) {
    return await axiosHhAuthorizationInstance.post<Promise<{ idRequest: number }>>(
      '/scoreball',
      body,
    );
  },
};
