import React from "react";
import { SuiClientProvider, createClient } from "@mysten/dapp-kit";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { SuiProvider } from "./context/SuiContext";

const client = createClient({
  url: "https://fullnode.testnet.sui.io"
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SuiClientProvider network="testnet">
      <SuiProvider>
        <App />
      </SuiProvider>
    </SuiClientProvider>
  </React.StrictMode>
);