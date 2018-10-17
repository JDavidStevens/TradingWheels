import React from 'react';
import {connect} from "react-redux";

export function NonOwned(props) {

  console.log("props",props);

const fullStockList = props.nonOwnedStocks.map((element, index) => {
      
      return (
        <tr key={index}>
          <td>{element.stock_name}</td>
          <td>{element.symbol}</td>
          <td>{props.quotes[element.symbol].quote.latestPrice}</td>
          <td>{props.quotes[element.symbol].quote.previousClose}</td>
          {props.quotes[element.symbol].quote.change>=0?
          <td className="positive">{props.quotes[element.symbol].quote.change}</td>:<td className="negative">{props.quotes[element.symbol].quote.change}</td>}
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
            </tr>
            {fullStockList}
           
          </tbody>
        </table>
      </div>
    );
  }


function mapStateToProps(state){
  const {quotes, nonOwnedStocks} =state;
  return{
    quotes, 
    nonOwnedStocks
  }
}

export default connect(
  mapStateToProps
)(NonOwned);