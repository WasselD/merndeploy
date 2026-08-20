import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouterUser = () => {
  const { user, initializing } = useSelector((state) => state.auth);

  if (initializing) {
    return <div>Loading...</div>;

  }

  return !user 
  ?<Navigate to="/login"/>  
  :<Outlet /> ;
};

export default PrivateRouterUser;