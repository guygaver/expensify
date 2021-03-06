import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testuid';
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

const expensesData = {};
expenses.forEach(({
  id, description, amount, note, createdAt,
}) => {
  expensesData[id] = {
    description,
    note,
    amount,
    createdAt,
  };
});

beforeEach((done) => {
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

describe('Expense Action Generators', () => {
  test('it returns correct object for removeExpense action', () => {
    const action = actions.removeExpense({ id: 1 });
    expect(action).toEqual({
      type: 'REMOVE_EXPENSE',
      id: 1,
    });
  });

  test('remove expense from firebase', (done) => {
    const store = createMockStore({ auth: { uid } });
    const id = expenses[0].id;

    store
      .dispatch(actions.startRemoveExpense(expenses[0]))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'REMOVE_EXPENSE',
          id,
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value');
      }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
      });
  });

  test('it returns correct object for editExpense', () => {
    const action = actions.editExpense('123', { note: 'Note update' });
    expect(action).toEqual({
      type: 'EDIT_EXPENSE',
      id: '123',
      updates: { note: 'Note update' },
    });
  });

  test('edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = { description: 'change', amount: 10 };
    store
      .dispatch(actions.startEditExpense(id, updates))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
          type: 'EDIT_EXPENSE',
          id,
          updates,
        });

        return database.ref(`users/${uid}/expenses/${id}`).once('value');
      }).then((snapshot) => {
        expect(snapshot.val().description).toBe(updates.description);
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
      });
  });

  test('should set up correct action object with values', () => {
    const action = actions.addExpense(expenses[0]);

    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: expenses[0],
    });
  });

  test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
      description: 'mouse',
      amount: 30,
      note: 'This one is better',
      createdAt: 1000,
    };

    store.dispatch(actions.startAddExpense(expenseData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
  });

  test('should add expense to database and store with defaults', (done) => {
    const store = createMockStore(defaultAuthState);
    const expenseData = {
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
    };

    store.dispatch(actions.startAddExpense(expenseData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });

      return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
  });
});

test('should set expense action with data', () => {
  const action = actions.setExpenses(expenses);

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);

  store
    .dispatch(actions.startSetExpenses())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses,
      });
      done();
    });
});
