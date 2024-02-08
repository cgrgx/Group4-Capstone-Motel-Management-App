import { useLogout } from "./useLogout";
import PropTypes from "prop-types";

function Logout({ children, className }) {
  const { logout, isLoading } = useLogout();
  return (
    <button onClick={logout} className={className} disabled={isLoading}>
      {children}
    </button>
  );
}
Logout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Logout;
