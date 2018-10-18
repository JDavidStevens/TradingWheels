import React, { Component } from 'react';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login/login';
import Watchlist from './components/Watchlist/watchlist';
// import Owned from './components/Owned/owned';
// import Nonowned from './components/Nonowned/nonowned';
// import Trade from './components/Trade/trade';
import Preview from './components/Preview/preview';
import Confirmation from './components/Watchlist/Confirmation';
// import Navbar from './components/Navbar/navbar';


class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Navbar/> */}
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/list' component={Watchlist} />
            {/* <Route path='/owned' component={Owned} /> */}
            {/* <Route path='/nonowned' component={Nonowned} /> */}
            {/* <Route path='/trade' component={Trade} /> */}
            {/* <Route path='' component={}/>
          <Route path='' component={}/> */}
            <Route path='/confirmation' component={Confirmation} />
            <Route path='/trade/preview/:symbol/:quantity/:price' component={Preview} />
            
          </Switch>
        </HashRouter>

      </div>
    );
  }
}

export default App;
