import expensesTotal  from './../../selectors/expenses-total' 
import expenses from './../fixtures/expenses'

test('should return 0 if no expenses', () => {
    const total = expensesTotal([]);
    expect(total).toBe(0);
});

test('should correctly add up a single expense', () => {
    const total = expensesTotal([expenses[0]]);
    expect(total).toBe(1000000);
});

test('should correctly add up a single expense', () => {
    const total = expensesTotal(expenses);
    expect(total).toBe(11010000);
});