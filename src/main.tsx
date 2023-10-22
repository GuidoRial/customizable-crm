import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store as isEditableStore } from "./features/isEditable/isEditableStore"
import { store as authStore } from "./features/auth/authStore"
import App from "./App"
import "./index.css"
import { CssBaseline, CssVarsProvider, GlobalStyles } from "@mui/joy"
import theme from "./theme"
import "./index.css"
import Alerts from "./components/ui/Alerts"
const globalStyles = {
  ":root": {
    "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
    "--Cover-width": "50vw", // must be `vw` only
    "--Form-maxWidth": "800px",
    "--Transition-duration": "0.4s", // set to `n∆one` to disable transition
  },
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={isEditableStore}>
      <CssVarsProvider
        defaultMode="dark"
        disableTransitionOnChange
        theme={theme}
      >
        <CssBaseline />
        <GlobalStyles styles={globalStyles} />
        <Provider store={authStore}>
          <App />
        </Provider>
      </CssVarsProvider>
    </Provider>
    <Alerts type="success" />
  </React.StrictMode>,
)
