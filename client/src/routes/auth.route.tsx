import { DashboardSkeleton } from "@/components/skeleton-loaders/dashboard-skeleton";
import useAuth from "@/hooks/api/use-auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthRoute } from "./common/routePaths";

// const AuthRoute = () => {
//   const location = useLocation();
//   const { data: authData, isLoading } = useAuth();
//   const user = authData?.user;

//   const _isAuthRoute = isAuthRoute(location.pathname);

//   if (isLoading && !_isAuthRoute) return <DashboardSkeleton />;

//   if (!user) return <Outlet />;

//   return <Navigate to={`/workspace/${user.currentWorkspace?._id}`} replace />;
// };

// export default AuthRoute;

const AuthRoute = () => {
  const location = useLocation();
  const { data: authData, isLoading } = useAuth();
  const user = authData?.user;

  const _isAuthRoute = isAuthRoute(location.pathname);

  // ✅ Check if there's a returnUrl in the query params
  const searchParams = new URLSearchParams(location.search);
  const returnUrl = searchParams.get("returnUrl");

  if (isLoading && !_isAuthRoute) return <DashboardSkeleton />;

  if (!user) return <Outlet />;

  // ✅ If returnUrl exists, let the login page handle the redirect
  if (returnUrl) return <Outlet />;

  return <Navigate to={`/workspace/${user.currentWorkspace?._id}`} replace />;
};

 export default AuthRoute;