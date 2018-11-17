import React from 'react'
import {shallow} from 'enzyme'
import {LoginPage} from './../../components/LoginPage'

test('it should render LoginPage component', () => {
    const wrapper = shallow(<LoginPage />);
    expect(wrapper).toMatchSnapshot();
});

test('should call logOut on button click', () => {
    const logIn = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={logIn}/>);
    wrapper.find('button').simulate('click');

    expect(logIn).toHaveBeenCalled();
});