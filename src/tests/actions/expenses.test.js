import * as actions from './../../actions/expenses'

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
        const expenseData = {
            description: 'Rent',
            amount: 1000.00,
            note: 'Test',
            createdAt: 1
        };

        const action = actions.addExpense(expenseData);

        expect(action).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                ...expenseData,
                id: expect.any(String)
            }
        })
    });

    test('should set up correct action object with default values', () => {
        const expectedData = {
            description: '',
            amount: 0,
            note: '',
            createdAt: 0
        };

        const action = actions.addExpense();

        expect(action).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                ...expectedData,
                id: expect.any(String)
            }
        })
    });
});
