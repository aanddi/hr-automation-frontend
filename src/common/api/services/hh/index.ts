import { axiosHhruInstance } from '@common/api/instance';

export const HhruService = {
  async getResumes(params: any) {
    const response = await axiosHhruInstance.get(`/resumes?${params}`, {
      params: {
        per_page: 1,
      },
    });
    return response.data;
  },
};
