import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

// ====================================================
import { RootReduers } from "../_Reducers";

const loggerMiddleware = createLogger();

export const store = createStore(
  RootReduers,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
