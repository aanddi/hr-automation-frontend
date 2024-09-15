interface IListRequests {
  items: IListRequestItem[];
}

interface IListRequestItem {
  id: number;
  createdAt: string;
}

interface IRequest {
  idRequest: number;
  info: IInfoRequest;
  resumes: IResumeRequest[];
}

interface IInfoRequest {
  urlHh: string;
  createdAt: string;
  prompt: string;
}

interface IResumeRequest {
  idRequest: number;
  firstName: string;
  lastName: string;
  middleName: string;
  age: number;
  title: string;
  urlResume: string;
  totalExperience: number;
  scoreball: number;
}

export type { IListRequests, IRequest, IInfoRequest, IResumeRequest, IListRequestItem };
