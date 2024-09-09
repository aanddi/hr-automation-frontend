import { instance } from "../../instance/api.instance";
import { IResume } from "../search/types";

export const ScoreballService = {
   async createScoreball(data: IResume[]) {
      const response = await instance.post("/scoreball", data);
      return response.data;
   },
};
