import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import Popup from 'reactjs-popup';
import {Table,Thead,Tbody,Tr,Th,Td} from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import TradeOwned from './TradeOwned/tradeOwned';
import {updateMyStocks,updateQuotes,updateNonOwnedStocks,updatePending} from '../../../ducks/reducer';
import './owned.css';



class Owned extends Component {

  async componentDidMount() {

    const myRes = await axios.get('/api/myStocks')
    let filteredTicker = myRes.data.map(element => element.symbol)

    const res = await axios.get('/api/nonowned')
    let filteredSymbols = res.data.map(element => element.symbol)

    const resp = await axios.get('/api/pending')
    let filterPendingSymbols = resp.data.map(element => element.symbol)

    let allSymbols = filteredTicker.concat(filteredSymbols).concat(filterPendingSymbols);


    const myResponse = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${allSymbols}&types=quote`)

    this.props.updateQuotes(myResponse.data);
    this.props.updateMyStocks(myRes.data);
    this.props.updateNonOwnedStocks(res.data);
    this.props.updatePending(resp.data);
  }

  render() {

    const myStockList = this.props.myStocks.map((element, index) => {
      let avgPrice = element.purchase_price / element.shares;
      let avgSharePrice = avgPrice.toFixed(2);

      let gainLoss = avgSharePrice - this.props.quotes[element.symbol].quote.latestPrice;

      let capital = gainLoss.toFixed(2);

      let total = element.shares * this.props.quotes[element.symbol].quote.latestPrice;

      let currentTotal = total.toFixed(2);

      console.log("quotes",this.props.quotes)
      console.log("mystocks",this.props.myStocks)
      return (

        <Tbody key={index}>
          <Tr >
            <Td className="owned-Td">{element.stock_name}</Td>
            <Td className="owned-Td">{element.symbol}</Td>
            <Td className="owned-Td">{this.props.quotes[element.symbol].quote.latestPrice}</Td>
            <Td className="owned-Td">{this.props.quotes[element.symbol].quote.previousClose}</Td>
            {this.props.quotes[element.symbol].quote.change >= 0 ?
              <Td className="owned-table-positive">{this.props.quotes[element.symbol].quote.change}</Td> : <Td className="owned-table-negative">{this.props.quotes[element.symbol].quote.change}</Td>}
            <Td className="owned-Td">{element.shares}</Td>
            <Td className="owned-Td">{avgSharePrice}</Td>
            {capital >= 0 ?
              <Td className="owned-table-positive">{capital} </Td> : <Td className="owned-table-negative">{capital}</Td>}
            <Td className="owned-Td">{currentTotal}</Td>
            <Td className="owned-Td"><Popup className="pop-up" trigger={<button className="buy-sell-button">Buy More/Sell</button>}>
              <TradeOwned currentTrade={element} currentPrice={this.props.quotes[element.symbol].quote.latestPrice}/>
            </Popup></Td>
          </Tr>
        </Tbody>



      )
    })

    return (
      <div className="Watchlist">
        <Table className="owned-table">
          <Thead>
            <Tr>
              <Th className="owned-th">Name</Th>
              <Th className="owned-th">Symbol</Th>
              <Th className="owned-th">Current Price</Th>
              <Th className="owned-th">Previous Close</Th>
              <Th className="owned-th">Change</Th>
              <Th className="owned-th">Shares</Th>
              <Th className="owned-th">Avg Purchase</Th>
              <Th className="owned-th">Gain/Loss</Th>
              <Th className="owned-th">Total Value</Th>
              <Th className="owned-th">Trade</Th>
            </Tr>
          </Thead>

          {myStockList}
        </Table>
        <div>
        <footer className="watchlist-footer">
        Data provided for free by <a href="https://iextrading.com/developer">IEX</a>. View <a href="https://iextrading.com/api-exhibit-a/">IEX’s Terms of Use</a>.
        </footer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { quotes, myStocks } = state;
  return {
    quotes,
    myStocks
  }
}

export default connect(
  mapStateToProps, {updateMyStocks,updateQuotes, updateNonOwnedStocks,updatePending}
)(Owned);