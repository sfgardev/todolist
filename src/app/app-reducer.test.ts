import {
  AppInitialState,
  appActions,
  appReducer,
  // setAppErrorAC,
  // setAppStatusAC,
} from "./appSlice";

let statrState: AppInitialState;

beforeEach(() => {
  statrState = { status: "loading", error: null, isInitialized: false };
});

test("error message should be set", () => {
  const endState = appReducer(
    statrState,
    appActions.setAppError({ error: "error" })
  );

  expect(endState.error).toBe("error");
});

test("correct status should be set", () => {
  const endState = appReducer(
    statrState,
    appActions.setAppError({ error: "succeeded" })
  );

  expect(endState.status).toBe("succeeded");
});
