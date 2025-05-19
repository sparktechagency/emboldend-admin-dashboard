import { baseApi } from "../../apiBaseQuery";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserManagement: builder.query({
      query: (page) => `/admin/dashboard/get-all-users?page=${page}`,
      providesTags: ["userManagement"], // Fixed typo
    }),

    updateUserManagement: builder.mutation({
      query: (data) => ({
        url: `/admin/dashboard/update-user-status/${data.id}`, // Updated endpoint
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["userManagement"], // Fixed typo
    }),
  }),
});

export const { useGetUserManagementQuery, useUpdateUserManagementMutation } =
  userApi;
