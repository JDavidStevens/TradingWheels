import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateAddCompany, updateAddSymbol, updateHandleAddToWatchlist, updateTab, updateBuySell,updateNonOwnedStocks } from '../../../ducks/reducer';
import axios from 'axios';
import Popup from 'reactjs-popup';
import TradeNonOwned from './TradeNonOwned/tradeNonOwned';

class NonOwned extends Component {
  constructor() {
    super()
    this.handleAddToWatchlist = this.handleAddToWatchlist.bind(this);
    this.handleRemove=this.handleRemove.bind(this);
  }

  handleAddToWatchlist() {
    let { addCompany, addSymbol } = this.props;
    axios.post(`/api/add`, { addCompany, addSymbol }).then(res=>{
      this.props.updateNonOwnedStocks(res.data)
    })
      
  }

 async handleRemove(id){
   axios.delete(`/api/remove/${id}`).then(res=>{
     this.props.updateNonOwnedStocks(res.data);
   })
}

  render() {
    
    const nonOwnedStockList = this.props.nonOwnedStocks.map((element, index) => {
      
        return (
          <tbody key={index}>
          <tr >
            <td>{element.stock_name}</td>
            <td>{element.symbol}</td>
            <td>{this.props.quotes[element.symbol].quote.latestPrice}</td>
            <td>{this.props.quotes[element.symbol].quote.previousClose}</td>
            {this.props.quotes[element.symbol].quote.change >= 0 ?
              <td className="positive">{this.props.quotes[element.symbol].quote.change}</td> : <td className="negative">{this.props.quotes[element.symbol].quote.change}</td>}
              <td><Popup trigger={<button>Buy</button>} position="right" >
            <TradeNonOwned currentPurchase={element} purchasePrice={this.props.quotes[element.symbol].quote.latestPrice}/>
          </Popup></td>
          <td><button onClick={()=>this.handleRemove(element.id)}
          >Remove</button></td>
          </tr>
          </tbody>
        )
      
    })

    return (
      <div className="Watchlist">
      <form>
          Add a company to your watchlist: <br />
          <input type="text" placeholder="Company Name" onChange={e => this.props.updateAddCompany(e.target.value)} />
          <input type="text" placeholder="Trade Symbol" onChange={e => this.props.updateAddSymbol(e.target.value)} />
          <input type="submit" onClick={this.handleAddToWatchlist} />

        </form>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Current Price</th>
              <th>Previous Close</th>
              <th>Change</th>
            </tr>
          </thead>
            {nonOwnedStockList}

        </table>
        <div>
        <footer>
        Data provided for free by <a href="https://iextrading.com/developer">IEX</a>. View <a href="https://iextrading.com/api-exhibit-a/">IEX’s Terms of Use</a>.
        </footer>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  const { quotes, nonOwnedStocks, addCompany, addSymbol } = state;
  return {
    quotes,
    nonOwnedStocks,
    addCompany,
    addSymbol
  }
}

export default connect(
  mapStateToProps, { updateAddCompany, updateAddSymbol, updateHandleAddToWatchlist, updateTab, updateBuySell,updateNonOwnedStocks }
)(NonOwned);