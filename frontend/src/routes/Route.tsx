import React from 'react';
import {
    RouteProps as RouteDOMProps,
    Route as RouteDOM,
    Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends RouteDOMProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
    isPrivate = false,
    component: Component,
    ...rest
}) => {
    const { user } = useAuth();

    return (
        <RouteDOM
            {...rest}
            render={({ location }) => {
                return isPrivate === !!user ? (
                    <Component />
                    ) : (
                        <Redirect
                        to={{ pathname: isPrivate? '/' : 'dashboard',
                            state: { from:location }
                        }}
                    />
                    );
            }}
        />
    );
};

export default Route;
