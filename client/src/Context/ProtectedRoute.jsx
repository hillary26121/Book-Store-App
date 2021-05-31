import { Route, Redirect } from "react-router-dom";
import { AccessTokenContext } from "./AccessTokenContext";
import { useContext, useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const { hasToken, refreshToken } = useContext(AccessTokenContext);
  const isLoggedIn = hasToken();
  const [isRefreshing, setIsRefreshing] = useState(!isLoggedIn);
  useEffect(() => {
    if (isRefreshing) refreshToken().then(() => setIsRefreshing(false));
  }, [isRefreshing]);
  return isLoggedIn ? <Route>{children}</Route> : <Redirect to="/signin" />;
}

export default ProtectedRoute;
