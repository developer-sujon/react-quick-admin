//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

//Internal Lib Import
import SessionHelper from "../../helpers/SessionHelper";

const settingReducer = createSlice({
  name: "settingReducer",
  initialState: {
    language: SessionHelper.getLanguage(),
    isLoading: false,
    customLoader: false,
    activeStore: SessionHelper.getActiveStore() || undefined,
    uiSettings: undefined,
    modalClose: true,
  },
  reducers: {
    changeLanguage(state, action) {
      SessionHelper.setLanguage(action.payload);
      state.language = SessionHelper.getLanguage();
    },
    changeModalClose(state, action) {
      state.modalClose = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCustomLoader(state, action) {
      state.customLoader = action.payload;
    },
    setActiveStoreReducer(state, action) {
      state.activeStore = action.payload;
      SessionHelper.setActiveStore(action.payload);
    },
    setUiSettings(state, action) {
      // console.log(action.payload)
      state.uiSettings = action.payload;
    },
  },
});

export const {
  changeLanguage,
  setLoading,
  setCustomLoader,
  setActiveStoreReducer,
  setUiSettings,
  changeModalClose,
} = settingReducer.actions;

export default settingReducer.reducer;
