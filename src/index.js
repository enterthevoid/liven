import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// Utils
import configureStore from "./redux/configureStore";
import history from "./utils/history";

// Containers
import App from "./app/views/App/App";

// Create redux store with history
const store = configureStore({}, history);
const MOUNT_NODE = document.getElementById("root");

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Fragment>,
  MOUNT_NODE
);
