import {
   configureStore,
   ThunkAction,
   Action,
   combineReducers,
} from "@reduxjs/toolkit";
import {
   FLUSH,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
   REHYDRATE,
   persistReducer,
   persistStore,
} from "redux-persist";
import request from "./slices/request.slice";
import historys from "./slices/historys.slice";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
   request,
   historys,
});

const persistConfig = {
   key: "HRAi",
   storage,
   blacklist: ["request"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
