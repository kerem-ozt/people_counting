import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import App2 from "./gpt";
import Appo from "./Appo";
import Berkozel from "./Berkozel";
import Lutfenlutfen from "./Lutfenlutfen";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Lutfenlutfen />
  </StrictMode>,
  rootElement
);