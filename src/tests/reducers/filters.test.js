import filtersReducer from './../../reducers/filters';
import moment from 'moment';

test('should setup default filter value', () => {
    const state = filtersReducer(undefined, { type: '@@INIT'});
    
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    })
});

test('should set sortBy to amount', () => {
   const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'});
   expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    
    const action = {type: 'SORT_BY_DATE'};
    
    const state = filtersReducer(currentState, action);
    
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const text = 'Test';
    const action = {type: 'SET_TEXT_FILTER', text};

    const state = filtersReducer(state, action);

    expect(state.text).toBe('Test');
});

test('should set start date filter', () => {
    let timestamp = moment();

    const action = {type: 'SET_START_DATE', timestamp};

    const state = filtersReducer(state, action);

    expect(state.startDate).toBe(timestamp);
});

test('should set text filter', () => {
    let timestamp = moment();

    const action = {type: 'SET_END_DATE', timestamp};

    const state = filtersReducer(state, action);

    expect(state.endDate).toBe(timestamp);
});
