import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateMyStocks, updateNonOwnedStocks, updatePending, updateQuotes, updateTab} from '../../ducks/reducer';
import axios from 'axios';
import NonOwned from './Nonowned/nonowned';
import Owned from './Owned/owned';
import Pending from './Pending/pending';
import Navbar from '../Navbar/navbar';

import './watchlist.css';


class Watchlist extends Component {

  async componentDidMount() {
    
    const myRes = await axios.get('/api/myStocks')
    let filteredTicker = myRes.data.map(element => element.symbol)
    
    const res = await axios.get('/api/nonowned')
    let filteredSymbols = res.data.map(element => element.symbol)

    const resp= await axios.get('/api/pending')
    let filterPendingSymbols = resp.data.map(element=>element.symbol)

    let allSymbols = filteredTicker.concat(filteredSymbols).concat(filterPendingSymbols);
    

    const myResponse = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${allSymbols}&types=quote`)
    
    this.props.updateQuotes(myResponse.data);
    this.props.updateMyStocks(myRes.data);
    this.props.updateNonOwnedStocks(res.data);
    this.props.updatePending(resp.data);
    console.log("resp",resp.data)
  }


  render() {

    return (
      <div className="Watchlist">
      <div><Navbar/></div>

      {/* ternary to allow time for state to update and return info so code does not break */}
        {this.props.myStocks[0] ? <h1>Hello {this.props.myStocks[0].firstname}!</h1> : ''}

        <h1>Watchlist</h1>

        <div>
          <button onClick={() => this.props.updateTab('owned')}>Owned</button>
          <button onClick={() => this.props.updateTab('non-owned')}>Non-Owned</button>
          <button onClick={() => this.props.updateTab('pending')}>Pending Orders</button>
        </div>
        <div>
          {(this.props.tab === "owned") ? (<Owned/>) : (this.props.tab==="non-owned")?(<NonOwned/>):(<Pending/>)}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { myStocks, tab } = state;
  return {
    myStocks,
    tab
  }
}

export default connect(
  mapStateToProps,
  { updateMyStocks, updateNonOwnedStocks, updatePending, updateQuotes, updateTab }
)(Watchlist);