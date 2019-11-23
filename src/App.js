import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import './style.css'
import process from 'process';

/* Components */
import Navbar from './components/navbar/Navbar';
import PageNotFound from './components/PageNotFound';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Logout from './components/login/Logout';

process.env.SECRET_KEY = "secret";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/" component={Home} />
                        <Route exact path="/logout" component={Logout} />
                        <Route component={PageNotFound} />
                    </Switch>

                </div>
            </div>
        </Router>
    );
}

export default App;
