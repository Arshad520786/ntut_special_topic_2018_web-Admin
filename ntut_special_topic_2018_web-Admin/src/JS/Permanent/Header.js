import React from "react";
import MetisMenu from "react-metismenu";
import RouterLink from "react-metismenu-router-link";

// ========================================================
var login = JSON.parse(localStorage.getItem("LogIn"));


// ========================================================

class Header extends React.Component {
  content = [
    {
      icon: "",
      label: "主頁面",
      to: "/"
    },
    {
      icon: "",
      label: "監控管理功能",
      to: login ? "Monitoring" : "LogIn"
    },
    {
      icon: "",
      label: "遠端控制功能",
      to: login ? "Remote" : "LogIn"
    },
    {
      icon: "",
      label: "車輛位置",
      to: login ? "Position" : "LogIn"
    },
    {
      icon: "",
      label: "路況分析",
      to: login ? "RoadCondition" : "LogIn"
    }
  ];

  updateContent = () => {
    this.content = [
      {
        icon: "",
        label: "主頁面",
        to: "/"
      },
      {
        icon: "",
        label: "監控管理功能",
        to: login ? "Monitoring" : "LogIn"
      },
      {
        icon: "",
        label: "遠端控制功能",
        to: login ? "Remote" : "LogIn"
      },
      {
        icon: "",
        label: "車輛位置",
        to: login ? "Position" : "LogIn"
      },
      {
        icon: "",
        label: "路況分析",
        to: login ? "RoadCondition" : "LogIn"
      }
    ];
  }

  componentDidMount = () => {
    login = JSON.parse(localStorage.getItem("LogIn"));
    this.updateContent();
  }

  componentDidUpdate = () => {
    this.updateContent();
  }

  render() {
    // ======================================================
    var UrlPath = window.location.href;
    var Temp;
    // console.log(UrlPath.split("/")[UrlPath.split("/").length - 1]);
    if (UrlPath.split("/")[UrlPath.split("/").length - 1] != "LogIn" && UrlPath.split("/")[UrlPath.split("/").length - 1] != "Register") {//login page會把左側列表隱藏
      Temp = <MetisMenu content={this.content} LinkComponent={RouterLink} />;
    }
    else {
      Temp = "";
    }
    // ======================================================
    return <div>{Temp}</div>;
  }
}
// ========================================================

export default Header;
