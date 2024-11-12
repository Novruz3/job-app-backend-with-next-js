import { ILoaderState } from "@/interfaces/redux/ILoaderState";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ILoaderState = {
  loading: false,
};

const loaderSlice = createSlice({
  name: "loaders",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
