import React from "react";
import { LogOutAPI } from "../Model/Redux/_API/Logout.API";

class Top extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    console.log(this.Data);
  }

  logout = (e) => {
    e.preventDefault();
    var Data = JSON.parse(localStorage.getItem("LogIn"));
    localStorage.clear();
    LogOutAPI(Data.data.LogIn.AccountToken, Data.data.LogIn.AccountID);
    document.location.href = "/";
  };

  render() {
    var UrlPath = window.location.href;
    var Top_Data;
    const unlogintags = (
      <div>
        <a className="col-md-1 Top_btn" href="/Register">
          Register
        </a>
        <a className="col-md-1 Top_btn" href="/LogIn">
          Login
        </a>
      </div>
    );
    const logintags = (
      <div>
        <a className="col-md-1 Top_btn" onClick={this.logout} href="#">
          logout
        </a>
        <a className="col-md-1 Top_btn" href="/ShowInfo">
          ShowInfo
        </a>
        <a className="col-md-1 Top_btn" href="/History">
          History
        </a>
        <a className="col-md-1 Top_btn" href="/Cars">
          Cars
        </a>
      </div>

    );

    if (
      UrlPath.split("/")[UrlPath.split("/").length - 1] != "LogIn" &&
      UrlPath.split("/")[UrlPath.split("/").length - 1] != "Register"
    ) {
      Top_Data = (
        <div className="Top_nav">
          <div className=" container">
            <div className="row justify-content-end">
              {localStorage.getItem("LogIn") ? logintags : unlogintags}
              {localStorage.getItem("LogIn")
                ? JSON.parse(localStorage.getItem("LogIn")).data.LogIn.AccountID
                : ""}
            </div>
          </div>
        </div>
      );
    }
    return <div>{Top_Data}</div>;
  }
}

export default Top;
