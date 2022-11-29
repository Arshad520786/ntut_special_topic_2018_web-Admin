import React from "react";
import { Line, Circle } from "rc-progress";

const url = "wss://testapi.dennysora.com:8081/socket?ID=";
var MonitorWebSocket = "";

class Monitoring extends React.Component {
  Car = JSON.parse(localStorage.getItem("CarID"));
  constructor(props) {
    super(props);
    this.state = {
      ID: "",
      km: 0,
      krpm: 0,
      radiator: 0,
      tank: 0
    };
    this.ConnectSocket = this.ConnectSocket.bind(this);
    this.CloseSocketHandler = this.CloseSocketHandler.bind(this);
    this.SetCarState = this.SetCarState.bind(this);
  }

  handlechange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.NewSocketHandler);
  }

  componentWillUnmount() {
    if (MonitorWebSocket) {
      window.addEventListener("beforeunload", this.CloseSocketHandler);
    }
  }

  ConnectSocket(e) {
    MonitorWebSocket = new WebSocket(url + this.state.ID);
    var ID = this.state.ID
    MonitorWebSocket.onopen = function () {
      console.log("handshake succeed:", ID);
    };
    MonitorWebSocket.onmessage = this.SetCarState;
    MonitorWebSocket.onclose = function () {
      console.log("Socket Closed");
    };
    MonitorWebSocket.onerror = function (e) {
      console.log(e.data);
    };
  }
  componentDidMount() {
    this.setState({ ID: this.Car.data.GetCarID[0].CarID }, this.NewSocketHandler)
  }

  CloseSocketHandler(e) {
    MonitorWebSocket.close();
  }

  NewSocketHandler = () => {
    if (MonitorWebSocket) {
      this.CloseSocketHandler();
    }
    this.ConnectSocket();
    this.setState({km:0});
    this.setState({krpm:0})
    this.setState({radiator:0})
    this.setState({tank:0})
  }

  SetCarState(e) {
    if (e) {
      var messgae = JSON.parse(e.data);
      console.log("from:", url, "\nmessage:", messgae);
    }
    this.setState({ km: messgae.km });
    this.setState({ krpm: messgae.krpm });
    this.setState({ radiator: messgae.radiator });
    this.setState({ tank: messgae.tank });
  }

  MeterColor(percentage) {
    if (percentage >= 0 && percentage <= 10) {
      return "#19FA00"
    }
    if (percentage >= 11 && percentage <= 85) {
      return "#0080FF"
    }
    if (percentage >= 86 && percentage <= 100) {
      return "#FF0039"
    }
  };
  MeterColorReverse(percentage) {
    if (percentage >= 0 && percentage <= 10) {
      return "#FF0039"
    }
    if (percentage >= 11 && percentage <= 85) {
      return "#0080FF"
    }
    if (percentage >= 86 && percentage <= 100) {
      return "#19FA00"
    }
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
      <div className="col-md-5 offset-md-4">
        <h1>Monitoring</h1>
        {SelectCarID}
        <br />
        <h4>時速 Km/hr:{this.state.km}</h4>
        <Line percent={this.state.km / 220 * 100}
          strokeWidth="4"
          strokeColor={this.MeterColor(this.state.km / 220 * 100)}>
        </Line>
        <br />

        <h4>轉速 krpm:{this.state.krpm}</h4>
        <Line percent={this.state.krpm / 8 * 100}
          strokeWidth="4"
          strokeColor={this.MeterColor(this.state.krpm / 8 * 100)}>
        </Line>
        <br />

        <h4>水箱 radiator:{this.state.radiator}</h4>
        <Line percent={this.state.radiator}
          strokeWidth="4"
          strokeColor={this.MeterColorReverse(this.state.radiator)}>
        </Line>
        <br />

        <h4>油箱 tank:{this.state.tank}</h4>
        <Line percent={this.state.tank}
          strokeWidth="4"
          strokeColor={this.MeterColorReverse(this.state.tank)}>
        </Line>


      </div>
    );
  }
}

export default Monitoring;
