import React, { Component } from 'react';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login/login';
import Watchlist from './components/Watchlist/watchlist';
import OwnedConfirmation from './components/Watchlist/Owned/TradeOwned/TradeOwnedConfirmation/tradeOwnedConfirmation';


class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/list' component={Watchlist} />
            <Route path='/oconfirm'component={OwnedConfirmation}/>
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
