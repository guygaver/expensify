import moment from 'moment'
import expenseSelector from './../../selectors/expenses';
import expenses from '../fixtures/expenses'

describe('Expense Selector', () => {
    test('should filter by text', () => {
        const filters = {
            text: 'R',
            sortBy: 'date',
            startDate: undefined,
            endDate: undefined,
        };

        const result = expenseSelector(expenses, filters);

        expect(result).toEqual([expenses[1]]);
    });

    test('should filter by start date', () => {
        const filters = {
            text: '',
            sortBy: 'date',
            startDate: moment(0),
            endDate: undefined,
        };

        const result = expenseSelector(expenses, filters);

        expect(result).toEqual([expenses[1], expenses[0]]);
    });

    test('should filter by end date', () => {
        const filters = {
            text: '',
            sortBy: 'date',
            startDate: moment(0).subtract(4, 'days'),
            endDate: moment(0),
        };

        const result = expenseSelector(expenses, filters);

        expect(result).toEqual([expenses[2]]);
    });

    test('should sort by amount', () => {
        const filters = {
            text: '',
            sortBy: 'amount',
            startDate: undefined,
            endDate: undefined,
        };

        const result = expenseSelector(expenses, filters);

        expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
    });

    test('should sort by date', () => {
        const filters = {
            text: '',
            sortBy: 'date',
            startDate: undefined,
            endDate: undefined,
        };

        const result = expenseSelector(expenses, filters);

        expect(result).toEqual([expenses[1], expenses[0], expenses[2]]);
    });
});