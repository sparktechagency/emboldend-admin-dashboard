import { baseApi } from "../../apiBaseQuery";

export const earningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarning: builder.query({
      query: ({ page = 1, status = '', search = '' }) => {
        let url = `/earnings?page=${page}`;

        // Only add status filter if it's not empty (not "all")
        if (status && status !== 'all') {
          url += `&status=${status}`;
        }

        // Add search parameter if provided
        if (search) {
          url += `&search=${search}`;
        }

        return url;
      },
      providesTags: ["earning"],
    }),
  }),
});

export const { useGetEarningQuery } = earningApi;