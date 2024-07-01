import { Dispatch } from "redux";

import { appActions } from "../../app/appSlice";
import { ResponseType } from "../types/types";

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
