import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';

//Vistas
import Dashboard from './Views/dashboard';
import Layout from './Components/layout';
import Games from './Views/games'

class App extends Component {
  render() {
      //Here will be the Routes to use for react
    return (
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Dashboard} />
                <Route path="games" component={Games}/>
            </Route>
        </Router>
    );
  }
}
export default App;
