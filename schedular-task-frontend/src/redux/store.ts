import { configureStore } from "@reduxjs/toolkit";


import { apiSlice } from "./features/api/apiSlice";
// import CourseSlice, { setUserCourses } from "../userCourses/CourseSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // auth: authSlice,
    // userCourses: CourseSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});



export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch