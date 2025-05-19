import { baseApi } from "../../apiBaseQuery";

export const offerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    profile: builder.query({
      query: () => "/user/profile",
      providesTags: ["profie"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),

    deleteUser: builder.mutation({
      query: () => ({
        url: "/user/delete",
        method: "DELETE",
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useProfileQuery,
  useUpdateProfileMutation,
  useDeleteUserMutation,
} = offerApi;
