import { axiosInstance } from '@common/api/instances';

import { IListRequests, IRequest } from './types';

const getAllList = async () => {
  const response = await axiosInstance.get<IListRequests>('/request/all');
  return response.data;
};

const getRequestById = async (id: number) => {
  const response = await axiosInstance.get<IRequest>(`/request/byId/${id}`);
  return response.data;
};

const deleteRequestById = async (id: number) => {
  const response = await axiosInstance.delete<Promise<{ message: string }>>(
    `/request/delete/${id}`,
  );
  return response;
};

export { getAllList, getRequestById, deleteRequestById };
