import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./features/isEditable/isEditableStore"
import App from "./App"
import "./index.css"
import { CssBaseline, CssVarsProvider, GlobalStyles } from "@mui/joy"
import theme from "./theme"
import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider
        defaultMode="dark"
        disableTransitionOnChange
        theme={theme}
      >
        <CssBaseline />
        <GlobalStyles
          styles={{
            ":root": {
              "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
              "--Cover-width": "50vw", // must be `vw` only
              "--Form-maxWidth": "800px",
              "--Transition-duration": "0.4s", // set to `n∆one` to disable transition
            },
          }}
        />
        <App />
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>,
)
