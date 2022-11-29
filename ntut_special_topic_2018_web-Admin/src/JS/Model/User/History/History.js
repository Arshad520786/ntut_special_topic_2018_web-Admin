import React from "react";

class History extends React.Component {
  his = JSON.parse(localStorage.getItem("Info"));
  AllSignIn = (
    <div>
      <h2>Sign in :</h2>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Times</th>
            <th scope="col">UseToken</th>
            <th scope="col">Types</th>
            <th scope="col">Device</th>
          </tr>
        </thead>
        <tbody>{this.SignInInfo()}</tbody>
      </table>
    </div>
  );
  AllLogOut = (
    <div>
      <h2>Log Out :</h2>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Times</th>
            <th scope="col">UseToken</th>
            <th scope="col">Types</th>
            <th scope="col">Device</th>
          </tr>
        </thead>
        <tbody>{this.LogOutInfo()}</tbody>
      </table>
    </div>
  );

  SignInCount() {
    var count = 0;
    while (this.his.data.GetUser.SiginHistory[count] != null) {
      count = count + 1;
    }
    return count;
  }

  SignInInfo() {
    var count = 0;
    var SignIn = [];
    while (count < this.SignInCount()) {
      SignIn.push(
        <tr>
          <th scope="row">{count + 1}</th>
          <td>{this.his.data.GetUser.SiginHistory[count].Times}</td>
          <td>{this.his.data.GetUser.SiginHistory[count].UseToken}</td>
          <td>{this.his.data.GetUser.SiginHistory[count].Types}</td>
          <td>{this.his.data.GetUser.SiginHistory[count].Device}</td>
        </tr>
      );
      count = count + 1;
    }
    return SignIn;
  }

  LogOutCount() {
    var count = 0;
    while (this.his.data.GetUser.LogoutHistory[count] != null) {
      count = count + 1;
    }
    return count;
  }

  LogOutInfo() {
    var count = 0;
    var LogOut = [];
    while (count < this.LogOutCount()) {
      LogOut.push(
        <tr>
          <th scope="row">{count + 1}</th>
          <td>{this.his.data.GetUser.LogoutHistory[count].Times}</td>
          <td>{this.his.data.GetUser.LogoutHistory[count].UseToken}</td>
          <td>{this.his.data.GetUser.LogoutHistory[count].Types}</td>
          <td>{this.his.data.GetUser.LogoutHistory[count].Device}</td>
        </tr>
      );
      count = count + 1;
    }
    return LogOut;
  }

  render() {
    return (
      <div className="main">
        {this.AllSignIn}
        {this.AllLogOut}
      </div>
    );
  }
}

export default History;
