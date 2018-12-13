import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../components/Header';

test('should render header correctly', () => {
  const wrapper = shallow(<Header logOut={() => {}} />);
  expect(wrapper).toMatchSnapshot();
});

test('should call logOut on button click', () => {
  const logOut = jest.fn();
  const wrapper = shallow(<Header logOut={logOut} />);
  wrapper.find('button').simulate('click');

  expect(logOut).toHaveBeenCalled();
});
