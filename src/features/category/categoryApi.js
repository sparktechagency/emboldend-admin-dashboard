import { baseApi } from "../../apiBaseQuery";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "/admin/dashboard/get-category",
      providesTags: ["category"],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/admin/dashboard/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `/admin/dashboard/update-category/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["category"],
    }),

    updateToggleStatus: builder.mutation({
      query: (data) => ({
        url: `/admin/dashboard/toggle-status/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/dashboard/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateToggleStatusMutation,
  useDeleteCategoryMutation,
} = categoryApi;
