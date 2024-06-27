import { Dispatch } from "redux";
import { appActions } from "../app/appSlice";
import { ResponseType } from "../api";

export const handleServerAppError = <D>(
  data: ResponseType<D>,
  dispatch: Dispatch
) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: "Something went wrong" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: Dispatch
) => {
  dispatch(appActions.setAppError({ error: error.message }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
