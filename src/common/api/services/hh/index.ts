import { axiosApiHhInstance } from '@common/api/instance';

export const HhruService = {
  async getAreas() {
    const response = await axiosApiHhInstance.get(`/areas`);
    return response.data;
  },

  async getExperience() {
    const response = await axiosApiHhInstance.get(`/industries`);
    return response.data;
  },

  async getProfessionalRoles() {
    const response = await axiosApiHhInstance.get(`/professional_roles`);
    return response.data;
  },

  async getSkillsSuggest(text: string) {
    const response = await axiosApiHhInstance.get(`/suggests/skill_set?text=${text}`);
    return response.data;
  },

  async getCountries() {
    const response = await axiosApiHhInstance.get(`/areas/countries`);
    return response.data;
  },
};
