import { ThemeProvider } from "@react95/core";
import "@react95/icons/icons.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { HealthCheckWrapper } from "./components/health-check-wrapper/health-check-wrapper";
import { ClientServicesProvider } from "./digital-api/clients";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <ClientServicesProvider>
          <HealthCheckWrapper></HealthCheckWrapper>
        </ClientServicesProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
