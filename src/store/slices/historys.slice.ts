import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
   historys: {
      id: string;
      description: string;
   }[];
}

const initialState: IInitialState = {
   historys: JSON.parse(localStorage.getItem("historys") || "[]") || [],
};

export const historysSlice = createSlice({
   name: "historys",
   initialState,
   reducers: {
      setHistory(_state, action) {
         const newItem = {
            id: new Date().toISOString(),
            description: action.payload.description,
         };

         const updatedHistorys = [newItem, ..._state.historys];

         // лимит в 10 историй, если лимит превышен, удаляем самый первый элемент
         if (updatedHistorys.length > 10) updatedHistorys.shift();

         return {
            ..._state,
            historys: updatedHistorys,
         };
      },

      deleteHistoryById(_state, action: PayloadAction<{ id: string }>) {
         const idDeletedItem = action.payload.id;


         const updatedHistorys = _state.historys.filter(
            (item) => item.id !== idDeletedItem
         );

         return {
            ..._state,
            historys: updatedHistorys,
         };
      },

      deleteAllHistory(_state) {
         return {
            ..._state,
            historys: [],
         };
      },
   },
});

export const { setHistory, deleteAllHistory, deleteHistoryById } =
   historysSlice.actions;

export default historysSlice.reducer;
