import authReducer from '../../reducers/auth';

test('it should return correct state for login', () => {
  const uid = '1';
  const state = authReducer(undefined, { type: 'LOGIN', uid });
  expect(state.uid).toEqual(uid);
});

test('it should return correct state for logout', () => {
  const state = authReducer({ uid: '1' }, { type: 'LOGOUT' });
  expect(state).toEqual({});
});

test('it should return correct state for default', () => {
  const state = authReducer(undefined, {});
  expect(state).toEqual({});
});
