import { configureStore } from "@reduxjs/toolkit";
import usersReduser from "../userSlice";
import loadersReduser from "../loaderSlice";

const store = configureStore({
  reducer: {
    users: usersReduser,
    loaders: loadersReduser,
  },
});

export default store