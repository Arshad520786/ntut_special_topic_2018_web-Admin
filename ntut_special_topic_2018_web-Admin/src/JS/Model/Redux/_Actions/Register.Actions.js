import { RegisterAPI } from "../_API/Register.API";
import { UserConstants } from "../_Constants";
import { AlertActions } from "./Alert.Actions";
import history from "../_Link/history";



export function Register(user) {
  return dispatch => {
    dispatch(request(user.Account));
    RegisterAPI(user).then(
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
    return { type: UserConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: UserConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserConstants.REGISTER_FAILURE, error };
  }
}
