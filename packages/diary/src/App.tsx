import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RouterProvider } from "react-router";
import { UserProvider } from "./hooks/user";
import router from "./router";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}
