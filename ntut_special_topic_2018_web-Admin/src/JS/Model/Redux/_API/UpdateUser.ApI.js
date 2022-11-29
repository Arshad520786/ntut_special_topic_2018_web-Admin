import { URL } from "./URL.API";
import { GetInfoAPI } from "./GetInfo.API";
export function UpdateUserAPI(Token, Account, user) {
  const TransData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query:
        'mutation UpdateUser{\nUpdateUser(\nToken:"' +
        Token +
        '"\nUser:{\nName:"' +
        user.Name +
        '",\nGender:' +
        user.Gender +
        ',\nCountryNumber:"' +
        user.Countrycode +
        '",\nPhoneNumber:"' +
        user.Number +
        '"\n}){\nStatus{\nStatusCode\nDescription\n}\nAccountID\n}\n}'
    })
  };

  //-----------------------------------------------------

  return fetch(URL, TransData)
    .then(HandleResponse)
    .then(User_GetUser);
}

function HandleResponse(Response) {
  return Response.text().then(text => {
    const Data = JSON.parse(text);
    if (Data.data.UpdateUser.Status.StatusCode == 8) {
      GetInfoAPI(
        JSON.parse(localStorage.getItem("LogIn")).data.LogIn.AccountToken,
        JSON.parse(localStorage.getItem("LogIn")).data.LogIn.AccountID
      );
    }
    return Data;
  });
}

// =====================================================
function User_GetUser(Data) {
  localStorage.setItem("Update", JSON.stringify(Data));
  return Data;
}
