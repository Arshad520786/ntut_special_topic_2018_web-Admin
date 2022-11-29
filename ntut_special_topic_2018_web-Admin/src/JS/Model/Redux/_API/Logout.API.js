import { URL } from "./URL.API";

export function LogOutAPI(Token, Account) {
  const TransData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query:
        'query LogOut{\nLogOut(\n Token:"' +
        Token +
        '",\nInformation:{\nType:"3",\nDevice:"3"\n}' +
        '\n){\nStatusCode\nDescription\n}\n}'
    })
  };

  //-----------------------------------------------------

  return fetch(URL, TransData)
    .then(HandleResponse)
    .then(User_GetUser);
}

function HandleResponse(Response) {
  return Response.text().then(text => {
    console.log(Response);
    const Data = JSON.parse(text);
    return Data;
  });
}
// =====================================================
function User_GetUser(Data) {
  return Data;
}
