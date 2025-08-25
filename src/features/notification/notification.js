import { baseApi } from "../../apiBaseQuery";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendNotification: builder.mutation({
      query: (data) => ({
        url: `/notifications/admin/notifications/send`,
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['notification'],
    }),


    getBussinessOwner: builder.query({
      query: () => "/users/all-business-owners",
      providesTags: ["notification"],
    }),

    getNotification: builder.query({
      query: () => "/notifications/super-admin",
      providesTags: ["notification"],
    }),

    readNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/super-admin`,
        method: 'PATCH',
      }),
      invalidatesTags: ['notification'],
    }),

    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['notification'],
    }),

    deleteAllNotifications: builder.mutation({
      query: () => ({
        url: `/notifications`,
        method: 'DELETE',
      }),
      invalidatesTags: ['notification'],
    }),
  }),
});

export const {
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
  useSendNotificationMutation,
  useGetNotificationQuery,
  useReadNotificationMutation,
  useGetBussinessOwnerQuery
} = notificationApi;