import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateMyStocks, updateMySymbols, updateMyQuotes, updateNonOwnedStocks, updateNonOwnedSymbols, updateQuotes, updateTab} from '../../ducks/reducer';
import axios from 'axios';
import NonOwned from './Nonowned/nonowned';
import Owned from './Owned/owned';
import './watchlist.css';


class Watchlist extends Component {

  async componentDidMount() {
    
    const myRes = await axios.get('/api/myStocks')
    let filteredTicker = myRes.data.map(element => element.symbol)
    this.props.updateMySymbols(filteredTicker);
    
    const myResponse = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.props.mySymbols}&types=quote`)
    this.props.updateMyQuotes(myResponse.data);
    this.props.updateMyStocks(myRes.data);
    
    const res = await axios.get('/api/nonowned')
    let filteredSymbols = res.data.map(element => element.symbol)
    this.props.updateNonOwnedSymbols(filteredSymbols);
    
    
    const response = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.props.nonOwnedSymbols}&types=quote`)
    this.props.updateQuotes(response.data);
    this.props.updateNonOwnedStocks(res.data);
    

  }


  render() {



    return (
      <div className="Watchlist">

        {/* {this.props.myStocks[0] ? <h1>Hello {this.props.myStocks[0].firstname}!</h1> : ''} */}

        <h1>Watchlist</h1>

        <div>
          <button onClick={() => this.props.updateTab('owned')}>Owned</button>
          <button onClick={() => this.props.updateTab('non-owned')}>Non-Owned</button>
        </div>
        <div>
          {(this.props.tab === "owned") ? (<Owned/>) : (<NonOwned/>)}
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { myStocks, mySymbols,  nonOwnedSymbols, nonOwnedStocks, tab } = state;
  return {
    myStocks,
    mySymbols,
    nonOwnedSymbols,
    nonOwnedStocks,
    tab
  }
}

export default connect(
  mapStateToProps,
  { updateMyStocks, updateMySymbols, updateMyQuotes,  updateNonOwnedStocks, updateNonOwnedSymbols, updateQuotes, updateTab }
)(Watchlist);