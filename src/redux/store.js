/* eslint-disable no-undef */
//External Lib Import
import { configureStore } from "@reduxjs/toolkit";

//Internal Lib Import
import { apiService } from "./api/apiService";

import authReducer from "./features/authReducer";
import paginationReducer from "./features/paginationReducer";
import settingReducer from "./features/settingReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    setting: settingReducer,
    pagination: paginationReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 128 },
      serializableCheck: { warnAfter: 128 },
    }).concat(apiService.middleware),
});

export default store;
