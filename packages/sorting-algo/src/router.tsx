import { createBrowserRouter } from "react-router";
import SortingVisualizer from "./pages/SortingAlgos";
import HeapPage from "./pages/Heap";
import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <>404</>,
    children: [
      {
        path: "/",
        Component: SortingVisualizer,
      },
      {
        path: "/heap",
        Component: HeapPage,
      },
    ],
  },
]);

export default router;
