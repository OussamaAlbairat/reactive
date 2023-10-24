import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import { MsalProvider } from "@azure/msal-react"
import { PublicClientApplication } from "@azure/msal-browser"
import { msalConfig } from "./authConfig"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/js/index.esm.js"
import "./index.css"

const msalInstance = new PublicClientApplication(msalConfig)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
)
