import React, { Component } from 'react';
import './App.css';
import { Router, Route, browserHistory, hashHistory} from 'react-router';

//Vistas
import Dashboard from './Views/dashboard'

class App extends Component {
  render() {
      //Here will be the Routes to use for react
    return (
        <Router history={hashHistory}>
            <Route path="/" component={Dashboard} />
        </Router>
    );
  }
}
export default App;
