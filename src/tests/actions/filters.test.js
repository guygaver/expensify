import moment from 'moment';
import * as actions from '../../actions/filters';

describe('Filter Action Getters', () => {
  test('it returns correct object for setStartDate action', () => {
    const action = actions.setStartDate(moment(0));

    expect(action).toEqual({
      type: 'SET_START_DATE',
      startDate: moment(0),
    });
  });

  test('it returns correct object for setStartDate action', () => {
    const action = actions.setEndDate(moment(0));

    expect(action).toEqual({
      type: 'SET_END_DATE',
      endDate: moment(0),
    });
  });

  test('it returns correct object for setTextFilter action', () => {
    const action = actions.setTextFilter('Test');

    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: 'Test',
    });
  });

  test('it returns correct object for setTextFilter with default', () => {
    const action = actions.setTextFilter();

    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: '',
    });
  });

  test('it returns correct object for sort by date', () => {
    expect(actions.sortByDate()).toEqual({ type: 'SORT_BY_DATE' });
  });

  test('it returns correct object for sort by amount', () => {
    expect(actions.sortByAmount()).toEqual({ type: 'SORT_BY_AMOUNT' });
  });
});
