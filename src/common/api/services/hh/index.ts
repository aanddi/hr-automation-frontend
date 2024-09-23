import { axiosHhruInstance } from '@common/api/instance';

export const HhruService = {
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
