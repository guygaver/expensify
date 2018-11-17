import expensesReducer from './../../reducers/expenses';
import expenses from '../fixtures/expenses'

test('should set default state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[0].id
    };
    
    const state = expensesReducer(expenses, action);
    
    expect(state).toEqual([expenses[1], expenses[2]]);
});

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        id: '1',
        description: 'Test',
        note: 'Test',
        amount: 100,
        createdAt: 10000
    };
    
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };

    const state = expensesReducer(expenses, action);
    
    expect(state).toEqual([...expenses, expense])
});

test('should edit an expense', () => {
    const edits = {
        description: 'Changing description',
    };

    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: edits
    };

    const state = expensesReducer(expenses, action);

    expect(state[0].description).toBe(edits.description)
});

test('should not edit expense if expense not found', () => {
    const expense = {
        id: '-1',
        description: 'Test',
    };

    const action = {
        type: 'EDIT_EXPENSE',
        expense
    };

    const state = expensesReducer(expenses, action);

    expect(state).toEqual(expenses)
});

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[0]]
    };
    
    const state = expensesReducer(expenses, action);
    
    expect(state).toEqual([expenses[0]])
});