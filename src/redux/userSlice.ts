import { IUserState } from "@/interfaces/redux/IUserState";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IUserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
