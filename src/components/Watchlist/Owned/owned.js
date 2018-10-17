import React from 'react';
import {connect} from "react-redux";

export function Owned(props) {

  console.log("props",props);

const myStockList = props.myStocks.map((element, index) => {
      let avgPrice = element.purchase_price/element.shares;
      let avgSharePrice= avgPrice.toFixed(2);

      let gainLoss=avgSharePrice-props.myQuotes[element.symbol].quote.latestPrice;
      let capital = gainLoss.toFixed(2);

      let total= element.shares * props.myQuotes[element.symbol].quote.latestPrice;
      let currentTotal= total.toFixed(2);
      return (
        <tr key={index}>
          <td>{element.stock_name}</td>
          <td>{element.symbol}</td>
          <td>{props.myQuotes[element.symbol].quote.latestPrice}</td>
          <td>{props.myQuotes[element.symbol].quote.previousClose}</td>
          {props.myQuotes[element.symbol].quote.change>=0?
          <td className="positive">{props.myQuotes[element.symbol].quote.change}</td>:<td className="negative">{props.myQuotes[element.symbol].quote.change}</td>}
          <td>{element.shares}</td>
          <td>{avgSharePrice}</td>
          {capital>=0?
          <td className="positive">{capital}</td>:<td className="negative">{capital}</td>}
          <td>{currentTotal}</td>
        </tr>
      )
    })

    return (
      <div className="Watchlist">
        <table>
          <tbody>
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
            </tr>
            {myStockList}
           
          </tbody>
        </table>
      </div>
    );
  }


function mapStateToProps(state){
  const {myQuotes, myStocks} =state;
  return{
    myQuotes, 
    myStocks
  }
}

export default connect(
  mapStateToProps
)(Owned);