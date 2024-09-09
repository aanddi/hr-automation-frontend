import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import resumesReducer from "./slices/resumes.slice";

export const store = configureStore({
   reducer: {
      resumes: resumesReducer,
   },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;