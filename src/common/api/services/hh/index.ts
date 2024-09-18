import { axiosHhruInstance } from '@common/api/instance';

import { IDataResumes } from './types';

export const HhruService = {
  async getResumes(params: any) {
    const response = await axiosHhruInstance.get<IDataResumes>(`/resumes?${params}`, {
      params: {
        per_page: 5,
      },
    });
    return response.data;
  },
};
