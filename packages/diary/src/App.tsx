import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { BrowserRouter, Route, Routes } from "react-router";
import {
  ForgotPasswordPage,
  LoginPage,
  SignupPage,
} from "@vipulwaghmare/auth-frontend";
import DashboardPage from "./screens/Dashboard";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
