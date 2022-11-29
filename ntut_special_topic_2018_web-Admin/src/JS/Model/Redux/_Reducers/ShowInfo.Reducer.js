import { UserConstants } from "../_Constants";

export function GetUsering(state = {}, action) {
  switch (action.type) {
    case UserConstants.GetUser_REQUEST:
      return {
        registering: true
      };
    case UserConstants.GetUser_SUCCESS:
      return {};
    case UserConstants.GetUser_FAILURE:
      return {};
    default:
      return state;
  }
}
