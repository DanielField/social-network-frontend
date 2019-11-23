import React, {Component} from 'react';

class Logout extends Component {
    constructor() {
        super();
        localStorage.removeItem("usertoken");
    }

    render() {
        return (
            <h1 className="title">You have been logged out of your account.</h1>
        );
    }
}

export default Logout;