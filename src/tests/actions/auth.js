import * as actions from '../../actions/auth';

test('it should build correct action object for logIn', () => {
  const uid = '1';
  const action = actions.logIn(uid);

  expect(action).toEqual({
    type: 'LOGIN',
    uid,
  });
});

test('it should build correct action object for logout', () => {
  const action = actions.logOut();

  expect(action).toEqual({
    type: 'LOGOUT',
  });
});
