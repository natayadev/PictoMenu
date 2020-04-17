import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import WebFont from 'webfontloader';

import { BrowserRouter } from "react-router-dom";
import App from "./App";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

WebFont.load({
  google: {
    families: ['Montserrat', 'sans-serif']
  }
})

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement
);