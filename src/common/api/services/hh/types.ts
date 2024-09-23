import { mockResponseResumes } from './mock';

export type IDataResumes = typeof mockResponseResumes;

export type IResume = IDataResumes['items'][0]; //
