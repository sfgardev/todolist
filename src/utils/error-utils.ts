import { Dispatch } from "redux";
import { ResponseType } from "../api/todolist-api";
import {
  SetAppErrorActionType,
  SetAppStatusActionType,
  setAppErrorAC,
  setAppStatusAC,
} from "../app/app-reducer";

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: ErrorUtilsDispatchType
) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(setAppErrorAC("Something went wrong"));
  }
  dispatch(setAppStatusAC("failed"));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ErrorUtilsDispatchType
) => {
  dispatch(setAppErrorAC(error.message));
  dispatch(setAppStatusAC("failed"));
};

type ErrorUtilsDispatchType = Dispatch<
  SetAppErrorActionType | SetAppStatusActionType
>;