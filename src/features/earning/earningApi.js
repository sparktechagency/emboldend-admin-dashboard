import { baseApi } from "../../apiBaseQuery";

export const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarning: builder.query({
      query: (page) => `/admin/dashboard/earnings?page=${page}`,
      providesTags: ["totalEarning"],
    }),

    getEarningsDetail: builder.query({
      query: (id) => ({
        url: `/admin/dashboard/earnings/${id}`,
        method: "GET",
      }),
      providesTags: ["totalEarning"],
    }),
  }),
});

export const { useGetEarningQuery, useGetEarningsDetailQuery } = earningApi;
