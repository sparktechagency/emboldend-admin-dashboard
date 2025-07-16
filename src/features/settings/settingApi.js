import { baseApi } from '../../apiBaseQuery';


export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),


    editProfile: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PATCH",
        body: data,
      }),
    }),


    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
      }),
    }),

  }),
});


export const {
  useChangePasswordMutation,
  useGetProfileQuery,
  useEditProfileMutation
} = settingApi;