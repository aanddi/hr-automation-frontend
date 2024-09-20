import { axiosHhruInstance } from '@common/api/instance';

export const HhruService = {
  async getResumes(params: any) {
    const response = await axiosHhruInstance.get(`/resumes?${params}`, {
      params: {
        per_page: 5,
      },
    });
    return response.data;
  },

  async getAreas() {
    const response = await axiosHhruInstance.get(`/areas`);
    return response.data;
  },

  async getExperience() {
    const response = await axiosHhruInstance.get(`/industries`);
    return response.data;
  },

  async getProfessionalRoles() {
    const response = await axiosHhruInstance.get(`/professional_roles`);
    return response.data;
  },
};
