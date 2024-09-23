import { axiosHhAuthorizationInstance } from '@common/api/instance';

export const SearchService = {
  async getResumes(params: string) {
    const response = await axiosHhAuthorizationInstance.get(`/search/resumes`, {
      params: {
        params,
      },
    });
    return response.data;
  },
};
