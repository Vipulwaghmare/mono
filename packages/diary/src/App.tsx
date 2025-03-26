import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { RouterProvider } from "react-router";
import { UserProvider } from "./hooks/user";
import router from "./router";
import { ThemeProvider } from "./hooks/themes";

const queryClient = new QueryClient();

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
