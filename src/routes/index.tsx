import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "@/pages";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Profile from "@/pages/users/profile";
import EditProfile from "@/pages/users/edit-profile";
import Books from "@/pages/books";
import DetailBook from "@/pages/books/detail";
import History from "@/pages/borrow/history";

import { useToken } from "@/utils/contexts/token";

const App = () => {
  const { token } = useToken();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: token ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: token ? <Navigate to="/" /> : <Register />,
    },
    {
      path: "/profile",
      element: !token ? <Navigate to="/login" /> : <Profile />,
    },
    {
      path: "/edit-profile",
      element: !token ? <Navigate to="/login" /> : <EditProfile />,
    },
    {
      path: "/books",
      element: <Books />,
    },
    {
      path: "/books/:id_book",
      element: <DetailBook />,
    },
    {
      path: "/history-borrow",
      element: !token ? <Navigate to="/login" /> : <History />,
    },
    {
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
