interface ISearchGpt {
   description: string;
}

interface IResponseSearchGpt {
   urlHHruApi: string;
   listCandidates: {
      items: [];
      found: number;
      pages: number;
      page: number;
      per_page: number;
   };
}

export type { ISearchGpt, IResponseSearchGpt };
