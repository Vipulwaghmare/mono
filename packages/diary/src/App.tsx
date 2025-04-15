import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RouterProvider } from "react-router";
import router from "./router";
import { ThemeProvider } from "./hooks/themes";
import { UserProvider } from "@vipulwaghmare/auth-frontend";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

export default function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}
