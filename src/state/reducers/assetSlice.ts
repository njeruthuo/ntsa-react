import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { HistoryItem } from "./assetsApi";

export interface AssetState {
  history: HistoryItem[];
}

const initialState: AssetState = {
  history: [],
};

export const assetSlice = createSlice({
  name: "assetSlice",
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<HistoryItem[]>) => {
      state.history = action.payload;
    },

    clearHistory: (state) => {
      state.history = [];
    },
  },
});

export const { setHistory, clearHistory } = assetSlice.actions;

export default assetSlice.reducer;
