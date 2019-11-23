import React, { Component } from 'react';
import Strings from '../../strings';
import { post } from '../../util/Fetch';

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

        post(Strings.ROUTE_REGISTER, creds).then(data => {
            if (data.Error === undefined) {
                this.props.history.push('/login');
            } else {
                document.getElementById('status').innerText = data.Error;
            }
        }).catch(() => {
            document.getElementById('status').innerText = "There was an error while attempting to register.";
        });
    }

    render() {
        return (
            <div>
                <form noValidate onSubmit={this.onSubmit} className="auth-form">
                    <h1 className="form-title">Register</h1>
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
                        <button type="submit" className="btn-big">Register</button>
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