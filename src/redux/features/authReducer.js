//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

//Internal Lib Import
import SessionHelper from "../../helpers/SessionHelper";
// import store from "../store";

const authReducer = createSlice({
  name: "authReducer",
  initialState: {
    accessToken: SessionHelper.getAccessToken(),
    refreshToken: SessionHelper.getRefreshToken(),
    loginCurrentUser: undefined,
  },
  reducers: {
    userLogin: (state, action) => {
      SessionHelper.setAccessToken(action.payload.accessToken);
      SessionHelper.setRefreshToken(action.payload.refreshToken);
      state.accessToken = SessionHelper.getAccessToken();
      state.refreshToken = SessionHelper.getRefreshToken();
    },
    userLogout: (state) => {
      SessionHelper.clearStorage();
      state.accessToken = undefined;
      state.refreshToken = undefined;
      state.loginCurrentUser = undefined;
    },
    setCurrentUser: (state, action) => {
      state.loginCurrentUser = action.payload;
    },
  },
});

export const { userLogin, userLogout, setCurrentUser } = authReducer.actions;

export default authReducer.reducer;
