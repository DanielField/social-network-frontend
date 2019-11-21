import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import process from 'process';
import { confirmLoggedIn, confirmAdmin } from '../../util/Authorization';

class Navbar extends Component {
    logout(e) {
        e.preventDefault();

        localStorage.removeItem('usertoken');
        this.props.history.push(`/logout`);
    }

    render() {
        const adminButtons = (
            <li className="nav-item-right">
                <a href="/manage" className="nav-link">
                    Management
                </a>
            </li>
        );

        const defaultButtons = (
            <ul className="navbar">
                <li className="nav-item-right">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item-right">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        );

        const loggedInButtons = (
            <ul className="navbar">
                <li className="nav-item-right">
                    <a href="/logout" onClick={this.logout.bind(this)} className="nav-link">Logout</a>
                </li>
                <li className="nav-item-right">
                    <a href="/profile" className="nav-link">
                        My Profile
                    </a>
                </li>
                {(confirmAdmin(localStorage.usertoken))? adminButtons : null}
            </ul>
        );

        return (
            <ul className="navbar">
                <li className="nav-item">
                    <a href="/" className="nav-link">Home</a>
                </li>

                {(confirmLoggedIn(localStorage.usertoken, process.env.SECRET_KEY))?loggedInButtons: defaultButtons}  
            </ul>
        );
    }
}

export default withRouter(Navbar);