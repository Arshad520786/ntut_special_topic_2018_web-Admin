import { URL } from "./URL.API";
export function RegisterAPI(user) {
  const TransData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query:
        'mutation Register {\nCreateAccount(\n AccountIDPW:{\n AccountID:"' +
        user.Account +
        '",\n Password:"' +
        user.password +
        '"\n},\n User:{\nName:"' +
        user.Name +
        '",\n Gender: ' +
        user.Gender +
        ',\n  CountryNumber:"' +
        user.Countrycode +
        '",\n PhoneNumber:"' +
        user.Number +
        '"\n})\n\t{\nStatus{\nStatusCode\nDescription\n}\nAccountID\n\t}\n}'
    })
  };
  //-----------------------------------------------------

  return fetch(URL, TransData)
    .then(HandleResponse)
    .then(User_Register);
}

function HandleResponse(Response) {
  return Response.text().then(text => {
    const Data = JSON.parse(text);
    if (Data.data.CreateAccount.Status.StatusCode < 0) {
      alert(
        "StatusCode:  " +
          Data.data.CreateAccount.Status.StatusCode +
          "\n" +
          "Description:  " +
          Data.data.CreateAccount.Status.Description
      );
      return Promise.reject(Data.data.CreateAccount.Status.StatusCode);
    }
    return Data;
  });
}
// =====================================================
function User_Register(Data) {
  localStorage.setItem("Register", JSON.stringify(Data));
  return Data;
}
