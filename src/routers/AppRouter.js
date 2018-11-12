import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ExpensePageDashboard from './../components/ExpenseDashboardPage'
import CreateExpensePage from '../components/AddExpensePage'
import EditExpensePage from './../components/EditExpensePage'
import NotFoundPage from './../components/NotFoundPage'
import Header from './../components/Header'
import HelpPage from './../components/HelpPage'

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ExpensePageDashboard} exact={true}/>
                <Route path="/create" component={CreateExpensePage}/>
                <Route path="/edit/:id" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </BrowserRouter>  
);

export default AppRouter;