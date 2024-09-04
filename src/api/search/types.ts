import { mock } from "@/modules/Home/mock";

interface ISearchGpt {
   description: string;
}

type IResponseSearchGpt = typeof mock;

export type { ISearchGpt, IResponseSearchGpt };
