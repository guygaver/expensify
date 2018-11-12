import {createStore, combineReducers} from 'redux'
import uuid from 'uuid'

const expensesReducerDefaultState = [];
const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
};

const addExpense = (
    {description = '', note = '', amount = 0, createdAt = 0} = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

const setStartDate = (timestamp) => ({
    type: 'SET_START_DATE',
    timestamp
});

const setEndDate = (timestamp) => ({
    type: 'SET_END_DATE',
    timestamp
});

// Expenses reducer
const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ];
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if (expense.id === action.id ) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY_AMOUNT':
            return {
                ...state,
                sortBy: 'amount'
            };
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.timestamp
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.timestamp
            };
        default:
            return state;
    }
};

// Store
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filterReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
    console.log(store.getState());
});

store.dispatch(addExpense({
    description: 'Test',
    createdAt: 1000
}));

const expenseToDelete = store.dispatch(addExpense({
    description: 'Coffee',
    amount: 10000,
    createdAt: 200
}));

const expenseTwoDelete = store.dispatch(addExpense({
    description: 'Coffee',
    amount: 10000
}));

store.dispatch(removeExpense({id: expenseToDelete.expense.id}));

store.dispatch(editExpense(expenseTwoDelete.expense.id, { amount: 3000}));

store.dispatch(setTextFilter('ffe'));

store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

// store.dispatch(setStartDate(50));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(10000));

const demoState = {
    expenses: [{
        id: 123,
        description: 'January Rent',
        note: 'Final payment on that address',
        amount: 1000,
        createdAt: ''
    }],
    
    filters: {
        text: 'rent',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
};