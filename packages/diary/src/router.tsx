import { createBrowserRouter, Navigate } from "react-router";
import DashboardPage from "./screens/Dashboard";
import EntriesPage from "./screens/Entries";
import CalendarPage from "./screens/Calendar";
import MementoMoriPage from "./screens/MementoMori";
import {
  ForgotPasswordPage,
  LoginPage,
  ResetPasswordPage,
  SignupPage,
} from "@vipulwaghmare/auth-frontend";
import { useUser } from "./hooks/user";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const userContext = useUser();

  if (userContext.user) return children;
  return <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/entries",
    element: (
      <PrivateRoute>
        <EntriesPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/calendar",
    element: (
      <PrivateRoute>
        <CalendarPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/test",
    element: (
      <PrivateRoute>
        <MementoMoriPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage onSuccessRedirect="/" />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage />,
  },
]);

export default router;
