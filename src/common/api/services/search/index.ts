import { axiosInstance } from '@common/api/instance';

import { IResponseSearchGpt, ISearchGpt } from './types';

export const SearchService = {
  async getSearch(data: ISearchGpt) {
    return await axiosInstance.post<Promise<IResponseSearchGpt>>('/search', data);
  },
};
