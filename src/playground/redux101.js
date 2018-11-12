import {createStore} from 'redux'

const incrementCount = ({incrementBy = 1}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount= ({decrementBy = 1}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCount = () => ({
    type: 'RESET',
});

const setCount = ({count = 1}) => ({
    type: 'SET',
    count
});

// Reducers
// 1. Are pure functions (output only determined by input)
const countReducer = (state = {count: 0}, action) => {

    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };

        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };

        case 'RESET':
            return {
                count: 0
            };

        case 'SET':
            return {
                count: action.count
            };

        default:
            return state;
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState())
});

store.dispatch(incrementCount({incrementBy: 5}));

store.dispatch(decrementCount({decrementBy: 1000}));

store.dispatch(resetCount());

store.dispatch(decrementCount({decrementBy: 1000}));

store.dispatch(setCount({count: 1000000}));

unsubscribe();

store.dispatch({
    type: 'DECREMENT'
});

store.dispatch({
    type: 'DECREMENT'
});

store.dispatch({
    type: 'SET',
    count: 101
});