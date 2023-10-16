import { RouterProvider } from "react-router-dom"
import "./App.css"
import LoggedInRoutes from "./routes/LoggedInRoutes"
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes"

function App() {
  return (
    <>
      {false ? (
        <RouterProvider router={LoggedInRoutes()} />
      ) : (
        <RouterProvider router={NotLoggedInRoutes()} />
      )}
    </>
  )
}

export default App
