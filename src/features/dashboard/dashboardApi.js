import { baseApi } from "../../apiBaseQuery";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allCountAnalysis: builder.query({
      query: () => "/admin/dashboard/",
      providesTags: ["dashboard"],
    }),

    pieChartAnalysis: builder.query({
      query: (year = 2024) => `/admin/dashboard/pie-chart?year=${year}`,
      providesTags: ["dashboard"],
    }),

    orderChartAnalysis: builder.query({
      query: () => "/admin/dashboard/order-chart",
      providesTags: ["dashboard"],
    }),

    revinueChartAnalysis: builder.query({
      query: (year = 2025) => `/admin/dashboard/revenue?year=${year}`,
      providesTags: ["dashboard"],
    }),
    customerMapAnalysis: builder.query({
      query: () => "/admin/dashboard/customer-map",
      providesTags: ["dashboard"],
    }),
  }),
});

export const {
  useAllCountAnalysisQuery,
  usePieChartAnalysisQuery,
  useOrderChartAnalysisQuery,
  useRevinueChartAnalysisQuery,
  useCustomerMapAnalysisQuery,
} = dashboardApi;
