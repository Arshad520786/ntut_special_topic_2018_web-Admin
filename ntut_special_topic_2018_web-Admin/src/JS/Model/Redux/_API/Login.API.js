import { URL } from "./URL.API";
import { GetInfoAPI } from "./GetInfo.API";
import { GetCarIDAPI } from "./GetCarID.API";

export function LoginAPI(ID, Password) {
  const TransData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query:
        'query LogIn {\nLogIn(AccountID:"' +
        ID +
        '",\nPassword:"' +
        Password +
        '",\nInformation:{\nType:"3",\nDevice:"3",\n}' +
        '\n){\nStatus{\nStatusCode\nDescription\n}\nGetTimes\nAccountID\nAccountToken\n}\n}'
    })
  };
  //-----------------------------------------------------

  return fetch(URL, TransData)
    .then(HandleResponse)
    .then(User_Login);
}

// =====================================================

function HandleResponse(Response) {
  return Response.text().then(text => {
    const Data = JSON.parse(text);
    if (Data.data.LogIn.Status.StatusCode != 2) {
      return Promise.reject("ERROR");
    }
    console.log("status code:", Data.data.LogIn.Status.StatusCode)
    console.log("description:", Data.data.LogIn.Status.Description)
    return Data;
  });
}
// =====================================================
function User_Login(Data) {
  localStorage.setItem("LogIn", JSON.stringify(Data));
  GetInfoAPI(Data.data.LogIn.AccountToken, Data.data.LogIn.AccountID);
  GetCarIDAPI(Data.data.LogIn.AccountToken, Data.data.LogIn.AccountID);
  document.location.href = "/";
  return Data;
}
