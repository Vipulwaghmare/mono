import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { BrowserRouter, Route, Routes } from "react-router";
import LoginPage from "./screens/Login";
import SignupPage from "./screens/SignUp";
import ForgotPasswordPage from "./screens/ForgotPassword";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<LoginPage onSuccessRedirect="/" />} />
            <Route
              path="/login"
              element={<LoginPage onSuccessRedirect="/" />}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
              path="/reset-password/:token"
              element={<ForgotPasswordPage />}
            />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
