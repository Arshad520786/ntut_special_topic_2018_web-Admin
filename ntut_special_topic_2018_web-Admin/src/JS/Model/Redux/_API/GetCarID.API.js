import { URL } from "./URL.API";
export function GetCarIDAPI(Token, Account) {
  const TransData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query:
        'query GetCarID{\nGetCarID(\nToken:"' +
        Token +
        '"\n){\nStatus{\nStatusCode\nDescription\n}\nCarID\nCarName\nRefreshTime\nCreateTime\n}\n}'
    })
  };

  //-----------------------------------------------------

  return fetch(URL, TransData)
    .then(HandleResponse)
    .then(User_GetCarID);
}

function HandleResponse(Response) {
  return Response.text().then(text => {
    const Data = JSON.parse(text);
    return Data;
  });
}
// =====================================================
function User_GetCarID(Data) {
  localStorage.setItem("CarID", JSON.stringify(Data));
  return Data;
}
