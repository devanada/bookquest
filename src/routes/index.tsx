import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "@/pages";
import NotFoundPage from "@/pages/404";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import ProfilePage from "@/pages/users/profile";
import EditProfilePage from "@/pages/users/edit-profile";
import BooksPage from "@/pages/books";
import DetailBookPage from "@/pages/books/detail";
import HistoryPage from "@/pages/borrow/history";
import AdminPage from "@/pages/admin";

import ProtectedRoute from "./protected-route";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/edit-profile",
          element: <EditProfilePage />,
        },
        {
          path: "/books",
          element: <BooksPage />,
        },
        {
          path: "/books/:id_book",
          element: <DetailBookPage />,
        },
        {
          path: "/history-borrow",
          element: <HistoryPage />,
        },
        {
          path: "/dashboard",
          element: <AdminPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
