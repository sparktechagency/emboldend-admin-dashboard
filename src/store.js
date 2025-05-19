import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import idReducer from "./features/ids/idSlice";
import { businessApi } from "./features/bussinessManagement/bussinessApi";
import { dashboardApi } from "./features/dashboard/dashboardApi";
import { earningApi } from "./features/earning/earningApi";
import { userApi } from "./features/userManagement/userManagementApi";

const apis = [businessApi,dashboardApi,earningApi,userApi];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ids: idReducer, // Add the ID slice to store
    ...Object.fromEntries(apis.map((api) => [api.reducerPath, api.reducer])),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.map((api) => api.middleware)),
});
