import { baseApi } from "../../apiBaseQuery";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalRevenue: builder.query({
      query: () => "/analytics/monthly-revenue",
      providesTags: ["dashboard"],
    }),

    getdashboardStatictics: builder.query({
      query: () => `/analytics/summary-stats`,
      providesTags: ["dashboard"],
    }),

    getRecentInstitute: builder.query({
      query: () => "/analytics/institutions",
      providesTags: ["dashboard"],
    }),

  }),
});

export const {
  useGetRecentInstituteQuery,
  useGetTotalRevenueQuery,
  useGetdashboardStaticticsQuery,
} = dashboardApi;
