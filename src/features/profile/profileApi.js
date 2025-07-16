import { baseApi } from "../../apiBaseQuery";

export const offerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  useDeleteUserMutation,
} = offerApi;
