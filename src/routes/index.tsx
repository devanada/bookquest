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
import { getDetailBook } from "@/utils/apis/books";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          loader: () => "Homepage | BookQuest",
          element: <HomePage />,
        },
        {
          path: "/login",
          loader: () => "Login | BookQuest",
          element: <LoginPage />,
        },
        {
          path: "/register",
          loader: () => "Register | BookQuest",
          element: <RegisterPage />,
        },
        {
          path: "/profile",
          loader: () => "Profile | BookQuest",
          element: <ProfilePage />,
        },
        {
          path: "/edit-profile",
          loader: () => "Edit Profile | BookQuest",
          element: <EditProfilePage />,
        },
        {
          path: "/books",
          loader: () => "Books | BookQuest",
          element: <BooksPage />,
        },
        {
          path: "/books/:id_book",
          loader: async ({ params }) => {
            const { payload } = await getDetailBook(params.id_book!);

            return `${payload.title} | BookQuest`;
          },
          element: <DetailBookPage />,
        },
        {
          path: "/history-borrow",
          loader: () => "History Borrow | BookQuest",
          element: <HistoryPage />,
        },
        {
          path: "/dashboard",
          loader: () => "Dashboard | BookQuest",
          element: <AdminPage />,
        },
        {
          path: "*",
          loader: () => "Not Found | BookQuest",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
