import { IDataResumes } from '@common/api/services/hh/types';
import { ICreacteAnalyze } from '@modules/Home/components/modal/AnalyzeModal';

interface IСandidates {
   id: number;
   salary: string;
   age: number;
   profession: string;
   linkResume: string;
   experience: number;
}

type ICreateScoreball = ICreacteAnalyze & IDataResumes

export type { IСandidates, ICreateScoreball };