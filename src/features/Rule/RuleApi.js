import { baseApi } from "../../apiBaseQuery";

export const RuleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTermConditions: builder.mutation({
      query: (data) => ({
        url: `/rules/terms-and-conditions`,
        method: "POST",
        body: data
      }),
      invalidatesTags: [],
    }),

    getTermConditions: builder.query({
      query: () => ({
        url: `/rules/terms-and-conditions`,
        method: "GET"
      }),
      invalidatesTags: [],
    }),

    CreatePrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: `/rules/privacy-policy`,
        method: "POST",
        body: data
      }),
      invalidatesTags: [],
    }),


    getPrivacyPolicy: builder.query({
      query: () => ({
        url: `/rules/privacy-policy`,
        method: "GET"
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useCreatePrivacyPolicyMutation,
  useCreateTermConditionsMutation,
  useGetPrivacyPolicyQuery,
  useGetTermConditionsQuery
} = RuleApi;
