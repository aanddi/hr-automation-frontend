interface ICreateRequest {
   urlHh: string;
   prompt: string;
   resumes: {
      idResumeHh: string;
      firstName: string;
      lastName: string;
      middleName: string;
      age: number;
      title: string;
      totalExperience: number;
      scoreball: number;
   }[];
}
