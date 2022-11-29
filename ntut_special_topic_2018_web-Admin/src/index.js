// ========================================================[Library]
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
// ========================================================[JS]
import Routers from "./JS/Routers";
import * as serviceWorker from "./serviceWorker";
import { store } from "./JS/Model/Redux/_Link/store";
// ========================================================[CSS]
import "./CSS/bootstrap.css";
import "./CSS/react-metismenu-standart.min.css";
// -------------------------------------------------------(self)
import "./CSS/Top.css";
import "./CSS/main.css";
// ========================================================[render]

render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
