import { baseApi } from "../../apiBaseQuery";

export const InstituteApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getInstitute: builder.query({
      query: ({ searchTerm = '', status = '', page = 1 }) => {
        let query = `/users/business-owners?page=${page}`;
        if (searchTerm) query += `&searchTerm=${searchTerm}`;
        if (status) query += `&status=${status}`;
        return query;
      },
      providesTags: ['institute'],
    }),


    getInstituteByOwnerId: builder.query({
      query: ({ id, status = '', page = 1 }) => {
        let query = `/users/business-owner/${id}/institutions?page=${page}`;
        if (status) query += `&status=${status}`;
        return query;
      },
      providesTags: ['institute'],
    }),


    GetInstitutionByID: builder.query({
      query: (id) => ({
        url: `/institutions/admin/${id}`,
        method: "GET"
      }),
      invalidatesTags: ["profile"],
    }),


    updateStatusWithInstitute: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/status/${id}`,
        method: "PATCH",
        body: data, // {"status":"ACIVE"} or INACTIVE
      }),
      invalidatesTags: ["profile"],
    }),


    UpdateInstitutionStatusByID: builder.mutation({
      query: ({ id, data }) => ({
        url: `/institutions/admin/${id}/status`,
        method: "PATCH",
        body: data, // {"status":"ACIVE"} or INACTIVE
      }),
      invalidatesTags: ["profile"],
    }),
  }),
});

export const {
  useGetInstituteByOwnerIdQuery,
  useGetInstituteQuery,
  useGetInstitutionByIDQuery,
  useUpdateInstitutionStatusByIDMutation,
  useUpdateStatusWithInstituteMutation
} = InstituteApi;
