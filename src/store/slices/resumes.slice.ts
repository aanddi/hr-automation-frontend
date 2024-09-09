import { IResume } from "@common/api/services/search/types";
import { createSlice } from "@reduxjs/toolkit";

interface ISliceResumes {
   resumes: IResume[];
}

const initialState: ISliceResumes = {
   resumes: [],
};

export const resumesSlice = createSlice({
   name: "resumes",
   initialState,
   reducers: {
      setResumes(_state, action) {
         return {
            ..._state,
            resumes: action.payload,
         };
      },
   },
});

export const { setResumes } = resumesSlice.actions;

export default resumesSlice.reducer;
