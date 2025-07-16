import { baseApi } from "../../apiBaseQuery";

export const SubscriptionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    CreateSubscriptionPlan: builder.mutation({
      query: (data) => ({
        url: `/packages`,
        method: "POST",
        body: data
      }),
      invalidatesTags: [""],
    }),

    GetSubscriptionPlans: builder.query({
      query: () => ({
        url: `/packages`,
        method: "GET",
      }),
      providesTags: [""],
    }),

    GetSubscriptionPlanByID: builder.query({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "SubscriptionPlan", id }],
    }),

    UpdateSubscriptionPlanByID: builder.mutation({
      query: ({ id, data }) => ({
        url: `/packages/${id}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "SubscriptionPlan", id },
        "SubscriptionPlan"
      ],
    }),

    DeleteSubscriptionPlanByID: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SubscriptionPlan"],
    }),

    GetActivePackage: builder.query({
      query: () => ({
        url: `/packages/active-package`,
        method: "GET",
      }),
      providesTags: ["ActivePackage"],
    }),
  }),
});

export const {
  useCreateSubscriptionPlanMutation,
  useGetSubscriptionPlansQuery,
  useDeleteSubscriptionPlanByIDMutation,
  useGetActivePackageQuery,
  useGetSubscriptionPlanByIDQuery,
  useUpdateSubscriptionPlanByIDMutation,
} = SubscriptionPlanApi;