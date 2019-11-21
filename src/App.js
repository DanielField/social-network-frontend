import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import process from 'process';

/* Components */
import Navbar from './components/navbar/Navbar';
import PageNotFound from './components/PageNotFound';
import Login from './components/login/Login';
import Home from './components/home/Home';

process.env.SECRET_KEY = "secret";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        {/* <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/logout" component={Logout} /> */}
                        <Route exact path="/" component={Home} />
                        <Route component={PageNotFound} />
                    </Switch>

                </div>
            </div>
        </Router>
    );
}

export default App;
