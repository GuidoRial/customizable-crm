import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Auth from "../views/Auth"

function NotLoggedInRoutes() {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/auth/:mode" element={<Auth />}></Route>
      </>,
    ),
  )
}

export default NotLoggedInRoutes
