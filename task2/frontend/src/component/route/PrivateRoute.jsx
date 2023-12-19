
import { Outlet, redirect } from 'react-router-dom';
import { useUser } from '../../statemanagement/UserContext';
import Login from '../../pages/auth/Login';

const PrivateRoute = () => {
  const { user } = useUser();
  if(user){
    return <Outlet/>
  }
  else{
    redirect("/login");
  }
  return (
   <>
   <Login/>
   </>
  );
};

export default PrivateRoute;
