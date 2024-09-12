export interface ScoreballRequestBody {
   resumes: any;
   prompt: string;
   urlHhRuApi: string;
}

export interface IResultResume {
   id: string;
   first_name: string;
   last_name: string;
   middle_name: string;
   title: string;
   total_experience: {
      months: number;
   };
   url: string;
   scoreball: number;
}
