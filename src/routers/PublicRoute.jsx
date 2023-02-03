import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({
  isAuthenticated,
  children,
  redirectTo = "/",
}) => {
  return isAuthenticated ? <Navigate to={redirectTo} /> : children;
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
};
