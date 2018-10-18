import React, { Component } from 'react';
import { connect } from "react-redux";
import Popup from 'reactjs-popup';
import TradeOwned from './TradeOwned/tradeOwned';


class Owned extends Component {
  render() {
console.log("props",this.props.myStocks)
    const myStockList = this.props.myStocks.map((element, index) => {
      let avgPrice = element.purchase_price / element.shares;
      let avgSharePrice = avgPrice.toFixed(2);

      let gainLoss = avgSharePrice - this.props.myQuotes[element.symbol].quote.latestPrice;
      let capital = gainLoss.toFixed(2);

      let total = element.shares * this.props.myQuotes[element.symbol].quote.latestPrice;
      let currentTotal = total.toFixed(2);
      return (

        <tbody key={index}>
          <tr >
            <td>{element.stock_name}</td>
            <td>{element.symbol}</td>
            <td>{this.props.myQuotes[element.symbol].quote.latestPrice}</td>
            <td>{this.props.myQuotes[element.symbol].quote.previousClose}</td>
            {this.props.myQuotes[element.symbol].quote.change >= 0 ?
              <td className="positive">{this.props.myQuotes[element.symbol].quote.change}</td> : <td className="negative">{this.props.myQuotes[element.symbol].quote.change}</td>}
            <td>{element.shares}</td>
            <td>{avgSharePrice}</td>
            {capital >= 0 ?
              <td className="positive">{capital}</td> : <td className="negative">{capital}</td>}
            <td>{currentTotal}</td>
            <td><Popup trigger={<button>Buy More/Sell</button>}>
              <TradeOwned currentTrade={element} currentPrice={this.props.myQuotes[element.symbol].quote.latestPrice}/>
            </Popup></td>
          </tr>
        </tbody>



      )
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
              <th>Shares</th>
              <th>Average Purchase Price Per Share</th>
              <th>Gain/Loss</th>
              <th>Total Current Value</th>
              <th>Trade</th>
            </tr>
          </thead>

          {myStockList}
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { myQuotes, myStocks } = state;
  return {
    myQuotes,
    myStocks
  }
}

export default connect(
  mapStateToProps
)(Owned);