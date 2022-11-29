import React from "react";
import { Switch, Route } from "react-router-dom";
// ========================================================
import Home from "./Model/Home";
import Monitoring from "./Model/Monitoring/Monitoring";
import Remote from "./Model/Remote/Remote";
import Positions from "./Model/Position/Position";
import RoadCondition from "./Model/RoadCondition/RoadCondition";
import ShowInfo from "./Model/User/ShowInfo/ShowInfo";
import LogIn from "./Model/User/Login/Login";
import History from "./Model/User/History/History";
import Register from "./Model/User/Register/Register";
import Cars from "./Model/User/Car/Cars";
import ChangePassword from "./Model/User/ShowInfo/ChangePassword"
// ========================================================

class Router_Link extends React.Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Monitoring" component={Monitoring} />
          <Route path="/Remote" component={Remote} />
          <Route path="/Position" component={Positions} />
          <Route path="/RoadCondition" component={RoadCondition} />
          <Route path="/ShowInfo" component={ShowInfo} />
          <Route path="/LogIn" component={LogIn} />
          <Route path="/Register" component={Register} />
          <Route path="/History" component={History} />
          <Route path="/Cars" component={Cars} />
          <Route path="/ChangePassword" component={ChangePassword} />
        </Switch>
      </main>
    );
  }
}

export default Router_Link;
