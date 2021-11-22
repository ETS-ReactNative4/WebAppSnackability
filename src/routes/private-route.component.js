import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../utils/auth';

const PrivateRoute = ({component: RouteComponent, ...rest}) => {

    const { currentUser, isLoading } = useContext(AuthContext);

    return (
        <Route {...rest} render={props => (
            isLoading ? (<></>) :
            !!currentUser ?
            (<RouteComponent {...props} />) :
            (<Redirect to={"/login"} />)
        )} />
    );

}

export default PrivateRoute;
