import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { getToken } from '../utils/authHelper';

const isAuth = () => {
    if (getToken() !== '') {
        return true
    }
    return false;
}

const PrivateRoute = ({ component: Component, ...rest}) => {
    return (
        <Route
            {...rest}
            render={
                props => !isAuth() ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname:'/'
                        }}
                    />
                )
            }
        />
    )
}


export default PrivateRoute;