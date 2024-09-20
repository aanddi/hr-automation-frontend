interface IListRequests {
  items: IListRequestItem[];
}

interface IListRequestItem {
  id: number;
  createdAt: string;
  title: string;
}

interface IRequest {
  idRequest: number;
  info: IInfoRequest;
  resumes: IResumeRequest[];
}

interface IInfoRequest {
  createdAt: string;
  title: string;
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
  comment: string;
}

export type { IListRequests, IRequest, IInfoRequest, IResumeRequest, IListRequestItem };
