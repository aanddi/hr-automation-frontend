interface ISearchGpt {
   description: string;
}

interface IResponseSearchGpt {
   generatedQuery: string;
}

export type { ISearchGpt, IResponseSearchGpt };
