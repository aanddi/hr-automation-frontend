import { IResponseSearchGpt, ISearchGpt } from "./types";
import { instance } from "../../instance/api.instance";

export const SearchService = {
   async getSearch(data: ISearchGpt) {
      const response = await instance.post<IResponseSearchGpt>("/search", data);
      return response.data;
   },
};
