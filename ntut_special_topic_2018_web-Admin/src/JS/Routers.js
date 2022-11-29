import React from "react";
import { Router } from "react-router-dom";
import { DatePicker } from 'antd';
// ========================================================
import Header from "./Permanent/Header";
import Router_Link from "./Router_Link";
import Top from "./Permanent/Top";
import history from "./Model/Redux/_Link/history";
// ========================================================

class Routers extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Top />
          <Header />
          <Router_Link />
        </div>
      </Router>
    );
  }
}

export default Routers;
