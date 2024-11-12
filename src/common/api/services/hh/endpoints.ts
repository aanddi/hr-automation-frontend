import { axiosApiHhInstance } from '@common/api/instances';

const getAreas = async () => {
  const response = await axiosApiHhInstance.get(`/areas`);
  return response.data;
};

const getExperience = async () => {
  const response = await axiosApiHhInstance.get(`/industries`);
  return response.data;
};

const getProfessionalRoles = async () => {
  const response = await axiosApiHhInstance.get(`/professional_roles`);
  return response.data;
};

const getSkillsSuggest = async (text: string) => {
  const response = await axiosApiHhInstance.get(`/suggests/skill_set?text=${text}`);
  return response.data;
};

const getCountries = async () => {
  const response = await axiosApiHhInstance.get(`/areas/countries`);
  return response.data;
};

export { getAreas, getExperience, getProfessionalRoles, getSkillsSuggest, getCountries };
