import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import Loading from '../pages/Loading';
import { AuthContext } from './AuthProvider';


const PrivateRoute = ({ children }) => {

    const { user,loading } = use(AuthContext);
     console.log(user);

      const location = useLocation();
      console.log(location);

    if (loading) {
    return <Loading></Loading>;
  }

    if(!user) {
        return <Navigate state={location.pathname} to="/auth/login"></Navigate>
    }

    return children
};

export default PrivateRoute;