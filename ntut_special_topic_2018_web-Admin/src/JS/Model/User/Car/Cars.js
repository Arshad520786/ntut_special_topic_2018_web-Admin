import React from "react";

class Cars extends React.Component {
  Car = JSON.parse(localStorage.getItem("CarID"));
  AllCarID = (
    <div>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">CarID</th>
            <th scope="col">CarName</th>
            <th scope="col">CreateTime</th>
            <th scope="col">RefreshTime</th>
          </tr>
        </thead>
        <tbody>{this.CarInfo()}</tbody>
      </table>
    </div>
  );
  CarCount() {
    var count = 0;
    if (this.Car != null) {
      while (this.Car.data.GetCarID[count] != null) {
        count = count + 1;
      }
    }
    return count;
  }


  CarInfo() {

    var AllCar = [];
    var count = 0;
    while (count < this.CarCount()) {
      AllCar.push(
        <tr>
          <th scope="row">{count + 1}</th>
          <td>{this.Car.data.GetCarID[count].CarID}</td>
          <td>{this.Car.data.GetCarID[count].CarName}</td>
          <td>{this.Car.data.GetCarID[count].CreateTime}</td>
          <td>{this.Car.data.GetCarID[count].RefreshTime}</td>
        </tr>
      );
      count = count + 1;
    }
    return AllCar;
  }

  render() {
    return (
      <div className="main">
        <h1>Car List:</h1>
        {JSON.parse(localStorage.getItem("CarID")) ? this.AllCarID : ""}
      </div>
    );
  }
}

export default Cars;
