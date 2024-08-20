import ISearchGpt from "./types";
import { instance } from "../api.instance";

export const SearchService = {
   async getSearch(data: ISearchGpt) {
      const response = await instance({
         url: `search`,
         method: "POST",
         data,
      });

      return response.data;
   },
};
