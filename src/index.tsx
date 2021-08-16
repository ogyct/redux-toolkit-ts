import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { HashRouter } from "react-router-dom";
import { worker } from "./mocks/browser";
async function main() {
    if (process.env.NODE_ENV === 'development') {
        if (window.location.pathname === '/redux-toolkit-ts') {
            window.location.pathname = '/redux-toolkit-ts/'
            return
        }
        const {worker} = require('./mocks/browser')
        await worker.start({
            serviceWorker: {
                url: '/redux-toolkit-ts/mockServiceWorker.js',
            },
        })
    }
}

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

main();
