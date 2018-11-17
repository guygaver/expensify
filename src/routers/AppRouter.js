import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpensePageDashboard from './../components/ExpenseDashboardPage';
import CreateExpensePage from '../components/AddExpensePage';
import EditExpensePage from './../components/EditExpensePage';
import NotFoundPage from './../components/NotFoundPage';
import HelpPage from './../components/HelpPage';
import LoginPage from "../components/LoginPage";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory(); 

export const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true}/>
                <PrivateRoute path="/dashboard" component={ExpensePageDashboard} />
                <PrivateRoute path="/create" component={CreateExpensePage}/>
                <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>  
);

export default AppRouter;