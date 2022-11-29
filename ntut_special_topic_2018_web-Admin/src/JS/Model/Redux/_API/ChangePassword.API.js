import { URL } from "./URL.API";
import { LogOutAPI } from "../_API/Logout.API"
export function ChangePasswordAPI(Token, OldPW, NewPW) {
  const TransData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query:
        'mutation ChangePassword{\nChangePassword(\nToken:"' +
        Token +
        '"\nOldPW:"' +
        OldPW +
        '"\nNewPW:"' +
        NewPW +
        '"\n){\nStatus{\nStatusCode\nDescription\n}AccountID\n}\n}'
    })
  };

  //-----------------------------------------------------

  return fetch(URL, TransData)
    .then(HandleResponse)
    .then(User_ChangePassword);
}

function HandleResponse(Response) {
  return Response.text().then(text => {
    const Data = JSON.parse(text);
    return Data;
  });
}
// =====================================================
function User_ChangePassword(Data) {
  localStorage.setItem("NewPW", JSON.stringify(Data))
  if (Data.data.ChangePassword.Status.StatusCode == 8) {
    //alert("Password has changed successfully")  
    var LogIn = JSON.parse(localStorage.getItem("LogIn"));
    localStorage.clear();
    LogOutAPI(
      LogIn.data.LogIn.AccountToken,
      LogIn.data.LogIn.AccountID
    );
    document.location.href = "/";
  }
  return Data;
}
