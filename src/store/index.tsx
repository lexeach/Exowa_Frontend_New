import LayoutReducer from "../slice/layoutSlice";
import { apiSlice } from "../service/apiSlice";
import authReducer from "../slice/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import { paperSlice } from "@/service/paper";
import { childrenSlice } from "@/service/children";
import { subjectSlice } from "@/service/subject";
import { syllabusSlice } from "@/service/syllabus";

export const store = configureStore({
  reducer: {
    layout: LayoutReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [paperSlice.reducerPath]: paperSlice.reducer,
    [childrenSlice.reducerPath]: childrenSlice.reducer,
    [subjectSlice.reducerPath]: subjectSlice.reducer,
    [syllabusSlice.reducerPath]: syllabusSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      paperSlice.middleware,
      childrenSlice.middleware,
      subjectSlice.middleware,
      syllabusSlice.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
