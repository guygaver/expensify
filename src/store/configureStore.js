import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import expensesReducer from './../reducers/expenses';
import filterReducer from './../reducers/filters';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    return createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filterReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
}