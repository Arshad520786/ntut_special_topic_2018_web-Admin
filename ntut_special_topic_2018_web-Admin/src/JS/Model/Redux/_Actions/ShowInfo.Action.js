import { GetInfoAPI } from "../_API/GetInfo.API";
import { UserConstants } from "../_Constants";
import { AlertActions } from "./Alert.Actions";
import history from "../_Link/history";

export function GetUser(user) {
  return dispatch => {
    dispatch(request(user.Account));
    GetInfoAPI(user).then(
      user => {
        dispatch(success(user));
        history.push("/");
      },
      error => {
        dispatch(failure(error.toString()));
        dispatch(AlertActions.error(error.toString()));
      }
    );
  };
  function request(user) {
    return { type: UserConstants.GetUser_REQUEST, user };
  }
  function success(user) {
    return { type: UserConstants.GetUser_SUCCESS, user };
  }
  function failure(error) {
    return { type: UserConstants.GetUser_FAILURE, error };
  }
}
