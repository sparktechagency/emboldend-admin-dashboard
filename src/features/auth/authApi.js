import { baseApi } from "../../apiBaseQuery";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Email Verification
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    // Forgot Password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation({
      query: ({ data, token }) => {
        console.log('API Query - Data:', data);
        console.log('API Query - Token:', token)
        return {
          url: "/auth/reset-password",
          method: "POST",
          body: data,
          headers: {
            resetToken: token,
            'Content-Type': 'application/json',
          },
        };
      },
    }),

    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks
export const {
  useLoginMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendOtpMutation
} = authApi;
