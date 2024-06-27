import { Dispatch } from "redux";
import { LoginRequestParams, authAPI } from "../../api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
// import { clearTodosDataAC } from "../Todos/todolists-reducer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { appActions } from "../../app/appSlice";
import { todolistsActions } from "../Todos/todolistsSlice";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
});

// thunks
export const loginTC = (params: LoginRequestParams) => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  authAPI
    .login(params)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const authMeTC = () => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  authAPI
    .authMe()
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(appActions.setIsInitialized({ isInitialized: true }));
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));
  authAPI
    .logout()
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        dispatch(todolistsActions.clearTodosData());
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const { selectIsLoggedIn } = slice.selectors;
