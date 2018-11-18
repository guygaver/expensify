import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { startLogout }from './../actions/auth'

export const Header = ({ logOut }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/dashboard">
                    <h1>Expensify</h1>
                </Link>
                <button className="button button--link" onClick={logOut}>Logout</button>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    logOut: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);