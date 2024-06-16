import { Dispatch } from "redux";
import { LoginRequestParams, authAPI } from "../../api";
import { setAppStatusAC, setIsInitializedAC } from "../../app/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { clearTodosDataAC } from "../Todos/todolists-reducer";

const initialState: AuthStateType = {
  isLoggedIn: false,
};

export const authReducer = (
  state = initialState,
  action: ActionsType
): AuthStateType => {
  switch (action.type) {
    case "SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.loggedIn };
    default:
      return state;
  }
};

// actions
export const setIsLoggedInAC = (loggedIn: boolean) =>
  ({ type: "SET-IS-LOGGED-IN", loggedIn }) as const;

// thunks
export const loginTC = (params: LoginRequestParams) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .login(params)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const authMeTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .authMe()
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    })
    .finally(() => {
      dispatch(setIsInitializedAC(true));
    });
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authAPI
    .logout()
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(setAppStatusAC("succeeded"));
        dispatch(clearTodosDataAC());
      } else {
        handleServerAppError(response.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

// type
type AuthStateType = {
  isLoggedIn: boolean;
};

type ActionsType = ReturnType<typeof setIsLoggedInAC>;
