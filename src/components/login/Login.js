import React, { Component } from 'react';
import Strings from '../../strings';

class Login extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const creds = {
            username: this.state.username,
            password: this.state.password
        };

        fetch(Strings.PROXY + Strings.ROUTE_LOGIN, {
            method: 'post',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(creds)
        }).then(response => response.json()).then(data => {
            if (data.usertoken !== undefined) {
                localStorage.setItem('usertoken', data.usertoken);
                this.props.history.push(Strings.ROUTE_HOME);
            } else {
                document.getElementById('status').innerText = data.error;
            }
        }).catch(() => {
            document.getElementById('status').innerText = "There was an error while attempting to login.";
        });
    }

    render() {
        return (
            <div>
                <form noValidate onSubmit={this.onSubmit} className="auth-form">
                    <h1 className="form-title">Login</h1>
                    <div className="form-row">
                        <div className="col-25">
                            <label htmlFor="username" className="form-label">Username</label>
                        </div>
                        <div className="col-75">
                            <input type="username"
                                className="form-input"
                                name="username"
                                placeholder="Enter username"
                                value={this.state.username}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-25">
                            <label htmlFor="password" className="form-label">Password</label>
                        </div>
                        <div className="col-75">
                            <input type="password"
                                className="form-input"
                                name="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <button type="submit" className="btn-big">Sign in</button>
                    </div>
                    <div className="form-row">
                        <p id="status"></p>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;