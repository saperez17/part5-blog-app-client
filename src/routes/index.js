import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from 'react';
import Home from 'components/Home';
import Users from 'components/Users';
import UserDetail from 'components/UserDetail';
import Blogs from 'components/Blogs';
import { ROUTES_NAVIGATION, ROUTES } from 'routes/routes';
import TopNavbar from 'components/TopNavbar';

const Routes = () => {
    return(
        <Router>
            <TopNavbar/>
            <Switch>
                <Route path="/users/:id">
                    <UserDetail/>
                </Route>
                <Route path="/users">
                    <Users/>
                </Route>
                <Route {...ROUTES[ROUTES_NAVIGATION.BLOGS]}>
                    <Blogs/>
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes;