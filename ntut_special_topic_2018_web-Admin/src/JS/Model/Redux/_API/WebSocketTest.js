export function WebSocketTest(ID) {
  var url = "wss://testapi.dennysora.com:8081/socket?ID=";
  var TestWebSocket = new WebSocket(url+ID);
  TestWebSocket.onopen = function() {
    console.log("handshake succeed")
    TestWebSocket.send("Ricardo Milos");
  };

  TestWebSocket.onmessage = function(e) {
    if(e){
      var messgae = JSON.parse(e.data);
    console.log("from:", url, "\nmessage:", messgae);}
  };
  TestWebSocket.onclose = function() {
    console.log("closing socket");
  };
  TestWebSocket.onerror = function(e) {
    console.log(e.data);
  };
  var SocketSend = (messgae) =>{
    TestWebSocket.send(messgae);
  }
}
export default WebSocketTest;
