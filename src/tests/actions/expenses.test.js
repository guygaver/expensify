import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './../../actions/expenses';
import expenses from './../fixtures/expenses';
import database from './../../firebase/firebase'

const createMockStore = configureMockStore([thunk]);

describe('Expense Action Generators', () => {
    test('it returns correct object for removeExpense action', () => {
        const action = actions.removeExpense({id: 1});
        expect(action).toEqual({
            type: 'REMOVE_EXPENSE',
            id: 1
        })
    });


    test('it returns correct object for editExpense', () => {
        const action = actions.editExpense('123', {note: "Note update"});
        expect(action).toEqual({
            type: 'EDIT_EXPENSE',
            id: '123',
            updates: {note: "Note update"}
        })
    });

    test('should set up correct action object with values', () => {
        const action = actions.addExpense(expenses[0]);

        expect(action).toEqual({
            type: 'ADD_EXPENSE',
            expense: expenses[0]
        })
    });
    
    test('should add expense to database and store', (done) => {
        const store = createMockStore({});
        const expenseData = {
            description: 'mouse',
            amount: 30,
            note: 'This one is better',
            createdAt: 1000
        };
        
        store.dispatch(actions.startAddExpense(expenseData)).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });
            
            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });

    test('should add expense to database and store with defaults', (done) => {
        const store = createMockStore({});
        const expenseData = {
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        };

        store.dispatch(actions.startAddExpense(expenseData)).then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual({
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            });

            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });
});
