import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

/* Components */
import PageNotFound from './components/PageNotFound';
import Login from './components/login/Login';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="container">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        {/* <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/logout" component={Logout} />
                        <Route exact path="/" component={Home} /> */}
                        <Route component={PageNotFound} />
                    </Switch>

                </div>
            </div>
        </Router>
    );
}

export default App;
