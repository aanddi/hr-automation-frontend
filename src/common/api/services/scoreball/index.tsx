import { axiosInstance } from '@common/api/instance';

// import { IDataResumes } from '../hh/types';

export const ScoreballService = {
  async createScoreball(body: any) {
    return await axiosInstance.post<Promise<{ idRequest: number }>>('/scoreball', body);
  },
};
