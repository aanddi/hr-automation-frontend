import { mock } from "./mock";

interface ISearchGpt {
   description: string;
}

interface IResponseSearchGpt {
   urlHHruApi: string;
   listCandidates: {
      items: IResume[];
   };
}

type IResume = typeof mock;

export type { ISearchGpt, IResponseSearchGpt, IResume };
