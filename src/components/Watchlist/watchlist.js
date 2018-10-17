import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateMyStocks, updateMySymbols, updateMyQuotes, updateNonOwnedStocks, updateNonOwnedSymbols, updateQuotes, updateTab } from '../../ducks/reducer';
import axios from 'axios';
import NonOwned from './Nonowned/nonowned';
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
    console.log("res.data",res.data)
  }


  render() {

    // const fullStockList = this.props.restock.map((element, index) => {

    //   return (
    //     <tr key={index}>
    //       <td>{element.stock_name}</td>
    //       <td>{element.symbol}</td>
    //       <td>{this.props.quotes[element.symbol].quote.latestPrice}</td>
    //       <td>{this.props.quotes[element.symbol].quote.previousClose}</td>
    //       {this.props.quotes[element.symbol].quote.change>=0?
    //       <td className="positive">{this.props.quotes[element.symbol].quote.change}</td>:<td className="negative">{this.props.quotes[element.symbol].quote.change}</td>}
    //     </tr>
    //   )
    // })

    return (
      <div className="Watchlist">

        {this.props.myStocks[0] ? <h1>Hello {this.props.nonOwnedStocks[0].firstname}!</h1> : ''}

        <h1>Watchlist</h1>

        <div>
          <button onClick={() => this.props.updateTab('owned')}>Owned</button>
          <button onClick={() => this.props.updateTab('non-owned')}>Non-Owned</button>
        </div>
        <div>
          {(this.props.tab === "owned") ? (<h1>'Owned Stock'</h1>) : (<NonOwned />)}
        </div>
        {/* <table>
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
        </table> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {myStocks ,tab } = state;
  return {
    myStocks,
    tab
  }
}

export default connect(
  mapStateToProps,
  { updateMyStocks, updateMySymbols, updateMyQuotes,updateNonOwnedStocks, updateNonOwnedSymbols, updateQuotes, updateTab }
)(Watchlist);