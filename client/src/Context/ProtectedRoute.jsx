import { Route, Redirect } from "react-router-dom";
import { AccessTokenContext } from "./AccessTokenContext";
import { useContext } from "react";

function ProtectedRoute({ children }) {
  const { hasToken } = useContext(AccessTokenContext);
  const isLoggedIn = hasToken();
  return isLoggedIn ? <Route>{children}</Route> : <Redirect to="/signin" />;
}

export default ProtectedRoute;
