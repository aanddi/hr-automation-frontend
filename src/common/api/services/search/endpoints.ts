import { axiosHhAuthorizationInstance } from '@common/api/instances';

const getResumes = async (params: string) => {
  const response = await axiosHhAuthorizationInstance.get(`/search/resumes`, {
    params: {
      params,
    },
  });
  return response.data;
};

export { getResumes };
