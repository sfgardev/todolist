import { LoginRequestParams, authAPI } from "../Todos/api";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { appActions } from "../../app/appSlice";
import { ResultCode } from "../../common/enum";
import {
  createAppAsyncThunk,
  handleServerAppError,
  handleServerNetworkError,
} from "../../common/utils";
import { tasksActions } from "../Todos/tasksSlice";
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
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      });
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
});

export const login = createAppAsyncThunk<undefined, LoginRequestParams>(
  `${slice.name}/login`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const response = await authAPI.login(arg);

      if (response.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(response.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const logout = createAppAsyncThunk(
  `${slice.name}/logout`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const response = await authAPI.logout();

      if (response.data.resultCode === 0) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        dispatch(todolistsActions.clearTodos());
        dispatch(tasksActions.clearTasks());
      } else {
        handleServerAppError(response.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const authMe = createAppAsyncThunk(
  `${slice.name}/authMe`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const response = await authAPI.authMe();

      if (response.data.resultCode === ResultCode.success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
        handleServerAppError(response.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch);
      return rejectWithValue(null);
    } finally {
      dispatch(appActions.setIsInitialized({ isInitialized: true }));
    }
  }
);

// thunks
// export const loginTC = (params: LoginRequestParams) => (dispatch: Dispatch) => {
//   dispatch(appActions.setAppStatus({ status: "loading" }));
//   authAPI
//     .login(params)
//     .then((response) => {
//       if (response.data.resultCode === 0) {
//         dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
//         dispatch(appActions.setAppStatus({ status: "succeeded" }));
//       } else {
//         handleServerAppError(response.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     });
// };

// export const authMeTC = () => (dispatch: Dispatch) => {
//   dispatch(appActions.setAppStatus({ status: "loading" }));
//   authAPI
//     .authMe()
//     .then((response) => {
//       if (response.data.resultCode === 0) {
//         dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
//         dispatch(appActions.setAppStatus({ status: "succeeded" }));
//       } else {
//         handleServerAppError(response.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     })
//     .finally(() => {
//       dispatch(appActions.setIsInitialized({ isInitialized: true }));
//     });
// };

// export const logoutTC = () => (dispatch: Dispatch) => {
//   dispatch(appActions.setAppStatus({ status: "loading" }));
//   authAPI
//     .logout()
//     .then((response) => {
//       if (response.data.resultCode === 0) {
//         dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
//         dispatch(appActions.setAppStatus({ status: "succeeded" }));
//         dispatch(todolistsActions.clearTodos());
//         dispatch(tasksActions.clearTasks());
//       } else {
//         handleServerAppError(response.data, dispatch);
//       }
//     })
//     .catch((error) => {
//       handleServerNetworkError(error, dispatch);
//     });
// };

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const { selectIsLoggedIn } = slice.selectors;
