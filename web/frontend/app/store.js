import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import { authReducer } from "./authReducer/index.js";
import { accountReducer } from "./accountReducer/index.js";

export const rootReducer = combineReducers({
    auth: authReducer,
    account: accountReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});