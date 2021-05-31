import { Route, Redirect } from "react-router-dom";
import { AccessTokenContext } from "./AccessTokenContext";
import { useContext, useState, useEffect } from "react";

function ProtectedRoute({ children, ...restOfProps }) {
  const { hasToken } = useContext(AccessTokenContext);
  const isLoggedIn = hasToken();
 
  return isLoggedIn ? <Route{...restOfProps}>{children}</Route> : <Redirect to="/signin" />;
}

export default ProtectedRoute;
