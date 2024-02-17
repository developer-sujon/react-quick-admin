//Internal Lib Import
import ToastMessage from "../../helpers/ToastMessage";
import { handleBackendError } from "../../helpers/error-handle/handleBackend.error";
import { apiService } from "../api/apiService";
import { userLogin, userLogout } from "../features/authReducer";

export const authService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (postBody) => ({
        url: "auth/register",
        method: "POST",
        body: postBody,
      }),
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: { message } }) => {
            ToastMessage.successMessage(message);
          })
          .catch((error) => handleBackendError(error, setError));
      },
    }),
    login: builder.mutation({
      query: ({ postBody }) => ({
        url: "auth/email/login",
        method: "POST",
        body: postBody,
      }),
      onQueryStarted(
        { setError, completeSubmit },
        { queryFulfilled, dispatch }
      ) {
        queryFulfilled
          .then(({ data: { data } }) => {
            completeSubmit();
            dispatch(userLogin(data));
          })
          .catch((error) => handleBackendError(error, setError));
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLogout());
        } catch (error) {
          /* empty */
        }
      },
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: `auth/fotgetPassword`,
        method: "POST",
        body: email,
      }),
    }),
    verifyForgetToken: builder.query({
      query: (email, token) => ({
        url: `auth/verifyForgetToken/${email}/${token}`,
        method: "GET",
      }),
    }),
    resetPasswordToken: builder.mutation({
      query: (email, token, postBody) => ({
        url: `auth/resetPasswordToken/${email}/${token}`,
        method: "POST",
        body: postBody,
      }),
    }),
  }),
});
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgetPasswordMutation,
  useVerifyForgetTokenQuery,
  useResetPasswordTokenMutation,
} = authService;
