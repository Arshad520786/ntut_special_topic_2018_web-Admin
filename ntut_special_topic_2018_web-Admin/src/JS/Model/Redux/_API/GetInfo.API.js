import { URL } from "./URL.API";
export function GetInfoAPI(Token, Account) {
  const TransData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query:
        'query GetUser{\nGetUser(\nToken:"' +
        Token +
        '",\nGetHistorysNumber:3\n' +
        '){\nStatus{\nStatusCode\nDescription\n}' +
        '\nProfile{\nName\nGender\nPhone{\nCountryNumber\nPhoneNumber\n}\n}' +
        '\nSiginHistory{\nTimes\nUseToken\nTypes\nDevice\n}' +
        '\nLogoutHistory{\nTimes\nUseToken\nTypes\nDevice\n}' +
        '\nCar{\nStatus{\nStatusCode\nDescription\n}\nCarID\nCarName\nRefreshTime\nCreateTime\n}\n' +
        '}\n}'
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
    return Data;
  });
}
// =====================================================
function User_GetUser(Data) {
  localStorage.setItem("Info", JSON.stringify(Data));
  return Data;
}
