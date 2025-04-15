import { useUser } from "@vipulwaghmare/auth-frontend";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const userContext = useUser();
  console.log(userContext.user);
  if (userContext.user) return children;
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
