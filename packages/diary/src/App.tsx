import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { BrowserRouter, Route, Routes } from "react-router";
import {
  ForgotPasswordPage,
  LoginPage,
  ResetPasswordPage,
  SignupPage,
} from "@vipulwaghmare/auth-frontend";
import DashboardPage from "./screens/Dashboard";
import EntriesPage from "./screens/Entries";
import CalendarPage from "./screens/Calendar";
import MementoMoriPage from "./screens/MementoMori";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/entries" element={<EntriesPage />} />
            <Route path="/dashboard/calendar" element={<CalendarPage />} />
            <Route path="/dashboard/test" element={<MementoMoriPage />} />
            <Route
              path="/login"
              element={<LoginPage onSuccessRedirect="/" />}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ResetPasswordPage />}
            />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
