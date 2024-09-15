import { axiosInstance } from '@common/api/instance';

import { IListRequests, IRequest } from './types';

export const RequestService = {
  async getAllList() {
    const response = await axiosInstance.get<IListRequests>('/request/all');
    return response.data;
  },

  async getRequestById(id: number) {
    const response = await axiosInstance.get<IRequest>(`/request/byId/${id}`);
    return response.data;
  },

  async deleteRequestById(id: number) {
    return await axiosInstance.delete<Promise<{ message: string }>>(`/request/delete/${id}`);
  },
};
