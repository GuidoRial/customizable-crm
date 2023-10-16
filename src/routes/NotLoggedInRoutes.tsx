import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import Login from "../views/Login"

function NotLoggedInRoutes() {
  return createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />}></Route>
      </>,
    ),
  )
}

export default NotLoggedInRoutes
