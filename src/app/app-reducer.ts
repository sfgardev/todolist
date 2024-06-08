const initialState: InitialAppState = {
  status: "loading",
  error: null,
};

export const appReducer = (
  state = initialState,
  action: ActionsType
): InitialAppState => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
};

// actions
export const setAppStatusAC = (status: RequestStatusType) =>
  ({
    type: "APP/SET-STATUS",
    status,
  }) as const;

export const setAppErrorAC = (error: string | null) =>
  ({
    type: "APP/SET-ERROR",
    error,
  }) as const;

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type InitialAppState = {
  status: RequestStatusType;
  error: string | null;
};

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>;
type ActionsType = SetAppStatusActionType | SetAppErrorActionType;
