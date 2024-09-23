import { ICreacteAnalyze } from '@modules/Home/components/modal/AnalyzeModal';

import { IDataResumes } from '@common/api/services/hh/types';

interface IСandidates {
  id: number;
  salary: string;
  age: number;
  profession: string;
  linkResume: string;
  experience: string;
  scoring?: string;
}

type ICreateScoreball = ICreacteAnalyze & IDataResumes;

export type { IСandidates, ICreateScoreball };
