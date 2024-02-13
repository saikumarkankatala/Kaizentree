import ReactDOM from "react-dom/client"
import "./index.css"
import { App } from "./App"
import { AppContextProvider } from "./components/AppContextProvider"
import {  createBrowserRouter,
  RouterProvider,Router, Navigate} from 'react-router-dom'
import Login from "./components/Auth/Login"
import Dashboard from "./components/Dashboard"
// import {createMemoryRouter} from 'react-router'

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate replace to="/login" />,
    },
    {
      path: "/login",
      element: <Login/>,
      
    },
    {
      path:'/dashboard',
      element:<Dashboard/>
    }
  ]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <AppContextProvider>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </AppContextProvider>
)
