import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../utils/auth';

const PublicRoute = ({component: RouteComponent, restricted, ...rest}) => {

    const { currentUser } = useContext(AuthContext);

    return (
        <Route {...rest} render={props => (
            !!currentUser && restricted ?
            (<Redirect to={"/usda"} />) :
            (<RouteComponent {...props} />)
        )} />
    );

}

export default PublicRoute;
