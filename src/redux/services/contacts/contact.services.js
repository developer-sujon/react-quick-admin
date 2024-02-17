//Internal Lib Import
import { handleBackendError } from "../../../helpers/error-handle/handleBackend.error";
import { getURL } from "../../../helpers/filter/qs";
import ToastMessage from "../../../utils/toast/ToastMessage";
import { apiService } from "../../api/apiService";

export const contactService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    contactList: builder.query({
      query: (queryParams) => ({
        url: `contacts${queryParams}`,
        method: "GET",
      }),
      transformResponse: ({ data }) => data || [],
    }),

    contactUpdate: builder.mutation({
      query: ({ postBody, id }) => ({
        url: `contacts/${id}`,
        method: "PATCH",
        body: postBody,
      }),
      onQueryStarted({ postBody, id, setError }, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: { message } }) => {
            ToastMessage.successMessage(message);
            dispatch(
              apiService.util.updateQueryData(
                "contactList",
                getURL(""),
                (draft) => {
                  const findIndex = draft?.data?.findIndex(
                    (item) => item._id === id
                  );
                  if (findIndex !== -1) {
                    draft.data[findIndex]["status"] = postBody.status;
                  }
                  return draft;
                }
              )
            );
          })
          .catch((error) => {
            handleBackendError(error, setError);
            console.log(error);
          });
      },
    }),

    contactDelete: builder.mutation({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data: { message } }) => {
            ToastMessage.successMessage(message);
            dispatch(
              apiService.util.updateQueryData(
                "contactList",
                getURL(""),
                (draft) => {
                  draft.data = draft.data.filter((item) => item._id !== id);
                  return draft;
                }
              )
            );
          })
          .catch((error) => {
            if (
              (error && error.status !== 400) ||
              !Array.isArray(error?.data?.data)
            ) {
              ToastMessage.errorMessage(error?.data?.message);
            }
          });
      },
    }),
  }),
});
export const {
  useContactListQuery,
  useContactDeleteMutation,
  useContactUpdateMutation,
} = contactService;
