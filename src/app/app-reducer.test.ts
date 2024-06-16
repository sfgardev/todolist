import {
  InitialAppState,
  appReducer,
  setAppErrorAC,
  setAppStatusAC,
} from "./app-reducer";

let statrState: InitialAppState;

beforeEach(() => {
  statrState = { status: "loading", error: null, isInitialized: false };
});

test("error message should be set", () => {
  const endState = appReducer(statrState, setAppErrorAC("error"));

  expect(endState.error).toBe("error");
});

test("correct status should be set", () => {
  const endState = appReducer(statrState, setAppStatusAC("succeeded"));

  expect(endState.status).toBe("succeeded");
});
