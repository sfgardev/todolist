import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (
      state,
      action: PayloadAction<{ status: RequestStatusType }>
    ) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
    setIsInitialized: (
      state,
      action: PayloadAction<{ isInitialized: boolean }>
    ) => {
      state.isInitialized = action.payload.isInitialized;
    },
  },
  selectors: {
    selectStatus: (state) => state.status,
    selectError: (state) => state.error,
    selectIsInitialized: (state) => state.isInitialized,
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const { selectError, selectIsInitialized, selectStatus } =
  slice.selectors;

// types
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type AppInitialState = ReturnType<typeof slice.getInitialState>;
