import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IResume } from '@common/api/services/search/types';

export interface IRequestStore {
  urlHhRuApi: string;
  prompt: string;
  resumes: IResume[];
}

export interface IRequestState {
  request: IRequestStore;
}

const initialState: IRequestState = {
  request: {
    urlHhRuApi: '',
    prompt: '',
    resumes: [],
  },
};

export const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setRequest(_state, action: PayloadAction<IRequestStore>) {
      console.log(action.payload);
      return {
        ..._state,
        request: action.payload
      };
    },
  },
});

export const { setRequest } = requestSlice.actions;

export default requestSlice.reducer;
