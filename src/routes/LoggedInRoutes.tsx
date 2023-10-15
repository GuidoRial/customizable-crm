import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
export function LoggedInRoutes() {
  return createBrowserRouter(
    createRoutesFromElements(<Route path="/dashboard"> 
    </Route>),
  )
}

export default LoggedInRoutes
