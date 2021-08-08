import React, {Fragment, lazy, Suspense} from "react";
import {
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import {ROUTES_NAMES} from "./constants";

export const renderRoutes = (routes = []) => {
    return (
        <Suspense fallback={<LoadingScreen/>}>
            <Switch>
                {
                    routes.map((route, i) => {
                        const Component = route.component;
                        return (
                            <Route
                                key={i}
                                path={route.path}
                                exact={route.exact}
                                render={(props) => (
                                    route.routes
                                        ? renderRoutes(route.routes)
                                        : <Component {...props} />
                                )}
                            />
                        );
                    })
                }
            </Switch>
        </Suspense>
    );
};

const routes = [
    {
        path: ROUTES_NAMES.HOME,
        exact: true,
        component: lazy(() => import("./views/LandingPage"))
    },
    {
        path: ROUTES_NAMES.JOURNEY,
        exact: true,
        component: lazy(() => import("./views/TheJourney"))
    },
    {
        path: ROUTES_NAMES.REFUEL,
        exact: true,
        component: lazy(() => import("./views/Refuel"))
    },
    {
        path: ROUTES_NAMES.USER_PROFILE,
        exact: true,
        component: lazy(() => import("./views/Profile"))
    },
    {
        path: "/",
        exact: true,
        component: () => <Redirect to={ROUTES_NAMES.HOME}/>
    },
    {
        path: "*",
        exact: true,
        component: () => <Redirect to={ROUTES_NAMES.HOME}/>
    }
];

export default routes;