import { combineReducers } from "redux";

// ====================================================

import { AuthenticationReducers } from "./Authentication.Reducer";

export const RootReduers = combineReducers({
  AuthenticationReducers
});
