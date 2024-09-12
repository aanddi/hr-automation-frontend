import { axiosInstance } from '@common/api/instance';

import { IRequestStore } from '@store/slices/request.slice';

export const ScoreballService = {
  async createScoreball(data: IRequestStore) {
    return await axiosInstance.post<Promise<{ idRequest: number }>>('/scoreball', data);
  },
};
