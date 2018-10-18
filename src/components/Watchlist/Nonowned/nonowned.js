import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateAddCompany, updateAddSymbol, updateHandleAddToWatchlist, updateTab } from '../../../ducks/reducer';
import axios from 'axios';
import Popup from 'reactjs-popup';
import Trade from '../Trade/trade';

class NonOwned extends Component {
  constructor() {
    super()
    this.handleAddToWatchlist = this.handleAddToWatchlist.bind(this);
  }

  async handleAddToWatchlist() {
    let { addCompany, addSymbol } = this.props;
    axios.post(`/api/add`, { addCompany, addSymbol })
      .then(() => {
        this.props.updateTab("non-owned")
      })
      .then(() => {
        this.props.updateHandleAddToWatchlist()
      })
  }

  render() {

    console.log('props', this.props)
    const nonOwnedStockList = this.props.nonOwnedStocks.map((element, index) => {
      if (this.props.quote === {}) {
        return null
      } else {
        return (
          <tbody key={index}>
          <tr >
            <td>{element.stock_name}</td>
            <td>{element.symbol}</td>
            <td>{this.props.quotes[element.symbol].quote.latestPrice}</td>
            <td>{this.props.quotes[element.symbol].quote.previousClose}</td>
            {this.props.quotes[element.symbol].quote.change >= 0 ?
              <td className="positive">{this.props.quotes[element.symbol].quote.change}</td> : <td className="negative">{this.props.quotes[element.symbol].quote.change}</td>}
              <td><Popup trigger={<button>Buy</button>} position="right">
            <Trade />
          </Popup></td>
          </tr>
          </tbody>
        )
      }
    })

    return (
      <div className="Watchlist">
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
        <form>
          Add a company to your watchlist: <br />
          <input type="text" placeholder="Company Name" onChange={e => this.props.updateAddCompany(e.target.value)} />
          <input type="text" placeholder="Trade Symbol" onChange={e => this.props.updateAddSymbol(e.target.value)} />
          <input type="submit" onClick={this.handleAddToWatchlist} />

        </form>
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
  mapStateToProps, { updateAddCompany, updateAddSymbol, updateHandleAddToWatchlist, updateTab }
)(NonOwned);