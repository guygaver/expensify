import React from 'react';
import { shallow } from 'enzyme';
import {ExpenseListFilter}  from './../../components/ExpenseListFilter';
import filters from './../fixtures/filters'

let setTextFilter, sortByAmount, sortByDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    wrapper = shallow(<ExpenseListFilter 
        filters={filters} 
        setTextFilter={setTextFilter} 
        sortByAmount={sortByAmount}
        sortByDate={sortByDate}
    />);
});

test('should render EditExpenseFilter', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle set text filter', () => {
    wrapper.find('input').prop('onChange')({target: {value: 'Test'}});
    expect(setTextFilter).toHaveBeenLastCalledWith('Test');
});

test('should handle sort by amount', () => {
    wrapper.find('select').prop('onChange')({target: {value: 'date'}});
    expect(sortByDate).toHaveBeenCalled();
});

test('should handle sort by date', () => {
    wrapper.find('select').prop('onChange')({target: {value: 'amount'}});
    expect(sortByAmount).toHaveBeenCalled();
});