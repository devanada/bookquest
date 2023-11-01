import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "@/pages";
import Profile from "@/pages/profile";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import Books from "@/pages/books";
import DetailBook from "@/pages/books/detail";
import History from "@/pages/borrow/history";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
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
      element: <History />,
    },
    {
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
