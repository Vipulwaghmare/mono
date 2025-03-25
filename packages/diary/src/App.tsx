import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "./screens/Landing";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { BrowserRouter, Route, Routes } from "react-router";
import Room from "./screens/Room";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/room/:roomId" element={<Room />} />
            <Route path="/:id" element={<Landing />} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
