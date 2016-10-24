import React, { Component } from 'react';
import { Router, Route, hashHistory, IndexRoute} from 'react-router';

//Views
import Dashboard from './Views/dashboard';
import Layout from './Components/layout';
import Games from './Views/games';
import Game from './Views/game';

class App extends Component {
  render() {
      //Here will be the Routes to use for react
    return (
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={Dashboard} />
                <Route path="games" component={Games}/>
                <Route path="game/:gameId" component={Game}/>
            </Route>
        </Router>
    );
  }
}
export default App;
