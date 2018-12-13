import moment from 'moment/moment';

const expenses = [
  {
    id: '1', description: 'A', amount: 1000000, note: 'Test', createdAt: moment(0).add(1, 'minute').valueOf(),
  },
  {
    id: '2', description: 'R', amount: 10000, note: 'Test', createdAt: moment(0).add(4, 'days').valueOf(),
  },
  {
    id: '3', description: 'V', amount: 10000000, note: 'Test', createdAt: moment(0).subtract(4, 'days').valueOf(),
  },
];

export default expenses;
