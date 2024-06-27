import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  AnyAction,
  UnknownAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "redux";
import { ThunkDispatch, thunk } from "redux-thunk";
import { tasksReducer } from "../features/Todos/tasksSlice";
import { todolistsReducer } from "../features/Todos/todolistsSlice";
import { appReducer } from "./appSlice";
import { authReducer } from "../features/Login/authSlice";
import { configureStore } from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
// const rootReducer = combineReducers({
//   app: appReducer,
//   tasks: tasksReducer,
//   todolists: todolistsReducer,
//   auth: authReducer,
// });
// непосредственно создаём store
// @ts-ignore
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export const store = configureStore({
  reducer: {
    app: appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer,
    auth: authReducer,
  },
});
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppThunkDispatch = ThunkDispatch<
  AppRootStateType,
  any,
  UnknownAction
>;
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;
