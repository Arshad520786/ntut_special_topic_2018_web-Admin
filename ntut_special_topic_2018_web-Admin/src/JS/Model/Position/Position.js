import React from "react";
import "../../../CSS/Map.css"
var GPSWebSocket = "";
var map;
var marker;

const API_key = "AIzaSyACrju0GMZyQiK4puhzFr99ds7MTvy_jE4";
const MapURL =
  "https://maps.googleapis.com/maps/api/js?key=" +
  API_key +
  "&callback=initMap";
const SocketURL = "wss://testapi.dennysora.com:8081/socket?ID=";

class Position extends React.Component {
  Car = JSON.parse(localStorage.getItem("CarID"));
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      lng: 121.53496898919457,
      lat: 25.042889522790944,
    };
    this.handlechange = this.handlechange.bind(this);
    this.ConnectSocket = this.ConnectSocket.bind(this);
    this.SetCarState = this.SetCarState.bind(this);
  }
  handlechange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.NewSocketHandler);
  }
  componentWillUnmount() {
    if (GPSWebSocket) {
      window.addEventListener("beforeunload", this.CloseSocketHandler);
    }
  }
  SetCarState(e) {
    if (e) {
      var message = JSON.parse(e.data);
      console.log("message:", message);
    }
    if (message.type = "gps") {
      this.setState({ lng: message.lng });
      this.setState({ lat: message.lat });
    }
    console.log(message);
    this.MapUpdate();
  }
  ConnectSocket(e) {
    GPSWebSocket = new WebSocket(SocketURL + this.state.ID);
    GPSWebSocket.onopen = function () {
      console.log("handshake succeed");
    };
    GPSWebSocket.onmessage = this.SetCarState;
    GPSWebSocket.onclose = function () {
      console.log("Socket Closed");
    };
    GPSWebSocket.onerror = function (e) {
      console.log(e.data);
    };
  }

  componentDidUpdate = () => {
  }

  CloseSocketHandler(e) {
    GPSWebSocket.close();
  }

  NewSocketHandler = () => {
    if (GPSWebSocket) {
      this.CloseSocketHandler();
    }
    this.ConnectSocket();
    console.log("NewSocket", this.state.ID);
  }

  CarCount() {
    var count = 0;
    if (this.Car != null) {
      while (this.Car.data.GetCarID[count] != null) {
        count = count + 1;
      }
    }
    return count;
  }

  SelectCarList() {
    var AllCarID = [];
    var count = 0;
    while (count < this.CarCount()) {
      AllCarID.push(
        <option value={this.Car.data.GetCarID[count].CarID}>{this.Car.data.GetCarID[count].CarID}</option>
      )
      count = count + 1;
    }
    return AllCarID;
  }

  initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: this.state.lat, lng: this.state.lng },
      zoom: 12,
      mapTypeId: window.google.maps.MapTypeId.roadmap,
      disableDefaultUI: false,
      styles:
        [
          {
            featureType: "poi",
            elementType: "labels",
            stylers:
              [
                {
                  visibility: "off"
                }
              ]
          }
        ]
    });

    marker = new window.google.maps.Marker({
      position: { lat: this.state.lat, lng: this.state.lng },
      map: map
    });
  }


  renderMap = () => {
    loadScript(MapURL);
    window.initMap = this.initMap;
  }

  componentDidMount() {
    this.renderMap()
    this.setState({ ID: this.Car.data.GetCarID[0].CarID }, this.NewSocketHandler)
  }

  MapUpdate = () => {
    var center = new window.google.maps.LatLng(this.state.lat, this.state.lng);
    map.panTo(center);
    marker.setPosition(center);
  }

  render() {
    const ID = this.state.ID;
    var SelectCarID = (
      <div>
        <select
          className="form-control"
          name="ID"
          value={this.state.ID}
          onChange={this.handlechange}
        >
          {this.SelectCarList()}
        </select>
      </div>)
    return (
      <div className="main">
        <div id="map"></div>
        {SelectCarID}
      </div>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default Position;
