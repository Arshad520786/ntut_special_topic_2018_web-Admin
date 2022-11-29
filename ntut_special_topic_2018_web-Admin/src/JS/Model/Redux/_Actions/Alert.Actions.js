import { AlertConstants } from "../_Constants";
// =============================================
export const AlertActions = {
  success,
  error,
  clear
};
// =============================================
function success(msg) {
  return { type: AlertConstants.SUCCESS, msg };
}

function error(msg) {
  return { type: AlertConstants.ERROR, msg };
}
function clear(msg) {
  return { type: AlertConstants.CLEAR, msg };
}
