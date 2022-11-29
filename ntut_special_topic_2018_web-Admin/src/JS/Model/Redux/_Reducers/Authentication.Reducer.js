import { UserConstants } from "../_Constants";

export function AuthenticationReducers(state = {}, action) {
  switch (action.type) {
    case UserConstants.LOGIN_REQUEST:
      return {
        LoggingIn: true,
        ID: action.ID
      };
    case UserConstants.LOGIN_SUCCESS:
      return {
        LoggingIn: true,
        ID: action.ID
      };
    case UserConstants.LOGIN_FAILURE:
      return {
        LoggingIn: true,
        ID: action.ID
      };
    default:
      return state;
  }
}
