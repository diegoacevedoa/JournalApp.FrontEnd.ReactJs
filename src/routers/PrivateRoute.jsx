import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const PrivateRoute = ({
  isAuthenticated,
  children,
  redirectTo = "/auth/",
}) => {
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};
