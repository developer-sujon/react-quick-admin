//External Lib Import
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Internal Lib Import
import { apiPrefix, baseURL } from "../../config/index";
import { userLogin, userLogout } from "../features/authReducer";
import { setLoading } from "../features/settingReducer";

//constant env variable
const SERVER_URL = baseURL;
const API_PREFIX_PATH = apiPrefix;

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL + API_PREFIX_PATH,
  prepareHeaders: (headers, { getState }) => {
    const {
      setting: { language },
      auth: { accessToken },
    } = getState();
    headers.set("authorization", accessToken ? `Bearer ${accessToken}` : "");
    headers.set("accept-language", language);
    return headers;
  },
  mode: "cors",
  // credentials: 'include',
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  api.dispatch(setLoading(true));
  let result = await baseQuery(args, api, extraOptions);
  const { error, data, meta } = result;

  if (error) {
    const auth = api.getState().auth;

    api.dispatch(setLoading(false));
    if (error?.data?.code === 403) {
      if (
        meta?.request?.method === "GET" &&
        meta?.request?.url?.includes("/profile")
      ) {
        api.dispatch(userLogout());
        // Clear the cache for the specific API slice
        api.dispatch(apiService.util.resetApiState());
      }
    }

    if (error?.data?.code === 401) {
      // try to get a new token
      const refreshResult = await baseQuery(
        `/auth/refreshTokens/${auth?.refreshToken}`,
        api,
        extraOptions
      );

      if (refreshResult?.data) {
        if (refreshResult?.data?.data) {
          // store the new token
          api.dispatch(userLogin(refreshResult?.data?.data));
          // retry the initial query
          result = await baseQuery(args, api, extraOptions);
        }
      } else {
        setTimeout(() => {
          api.dispatch(userLogout());
          // Clear the cache for the specific API slice
          api.dispatch(apiService.util.resetApiState());
        }, 1000);
      }
    }

    if (error?.data?.code === 400 || error?.data?.code === 406) {
      //ToastMessage.errorMessage(error.data?.message);
    }
  }

  if (data) {
    api.dispatch(setLoading(false));
    // if (data?.statusCode === 201 || data?.statusCode === 204 || data?.statusCode === 200) {
    //   const successMessage = data?.message;
    //   successMessage && ToastMessage.successMessage(successMessage);
    // }
  }

  return result;
};

export const apiService = createApi({
  reducerPath: API_PREFIX_PATH,
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
