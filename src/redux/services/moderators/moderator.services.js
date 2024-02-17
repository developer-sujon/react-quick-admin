//Internal Lib Import
import { handleBackendError } from "../../../helpers/error-handle/handleBackend.error";
import ToastMessage from "../../../utils/toast/ToastMessage";
import { apiService } from "../../api/apiService";

export const moderatorService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    moderatorList: builder.query({
      query: () => ({
        url: `moderators`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),

    moderatorCreate: builder.mutation({
      query: ({ postBody }) => ({
        url: `moderators`,
        method: "POST",
        body: postBody,
      }),
      onQueryStarted({ setError }, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: { data, message } }) => {
            ToastMessage.successMessage(message);
            dispatch(
              apiService.util.updateQueryData(
                "moderatorList",
                undefined,
                (draft) => {
                  draft.unshift(data);
                }
              )
            );
          })
          .catch((error) => {
            handleBackendError(error, setError);
          });
      },
    }),

    moderatorUpdate: builder.mutation({
      query: ({ postBody, id }) => ({
        url: `moderators/${id}`,
        method: "PATCH",
        body: postBody,
      }),
      onQueryStarted({ postBody, id, setError }, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: { data, message } }) => {
            ToastMessage.successMessage(message);
            dispatch(
              apiService.util.updateQueryData(
                "moderatorList",
                undefined,
                (draft) => {
                  const findIndex = draft.findIndex((item) => item._id === id);
                  Object.keys(postBody).forEach(
                    (key) => (draft[findIndex][key] = postBody[key])
                  );
                }
              )
            );
          })
          .catch((error) => {
            handleBackendError(error, setError);
          });
      },
    }),

    moderatorDelete: builder.mutation({
      query: (id) => ({
        url: `moderators/${id}`,
        method: "DELETE",
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: { message } }) => {
            ToastMessage.successMessage(message);
            dispatch(
              apiService.util.updateQueryData(
                "moderatorList",
                undefined,
                (draft) => draft.filter((item) => item._id !== id)
              )
            );
          })
          .catch(({ error }) => {
            if (error.status !== 400 || !Array.isArray(error?.data?.data)) {
              ToastMessage.errorMessage(error?.data?.message);
            }
          });
      },
    }),
  }),
});
export const {
  useModeratorListQuery,
  useModeratorDeleteMutation,
  useModeratorCreateMutation,
  useModeratorUpdateMutation,
} = moderatorService;
