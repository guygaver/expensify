import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import { startLogout }from './../actions/auth'

export const Header = ({ logOut }) => (
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create</NavLink>
        <NavLink to="/edit" activeClassName="is-active">Edit</NavLink>
        <button onClick={logOut}>Logout</button>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);