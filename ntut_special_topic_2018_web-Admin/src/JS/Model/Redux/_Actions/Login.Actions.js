import { LoginAPI } from "../_API";
import { UserConstants } from "../_Constants";
import { AlertActions } from "./Alert.Actions";
import history from "../_Link/history";

export function Login(ID, Password) {
  return dispatch => {
    dispatch(request(ID));
    LoginAPI(ID, Password).then(
      user => {
        dispatch(success(user));
        history.push("/")
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(AlertActions.error(error.toString()));
      }
    );
  };
  function request(user) {
    return { type: UserConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: UserConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserConstants.LOGIN_FAILURE, error };
  }
}
