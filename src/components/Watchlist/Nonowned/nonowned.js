import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateAddCompany, updateAddSymbol, updateHandleAddToWatchlist, updateTab, updateBuySell, updateNonOwnedStocks } from '../../../ducks/reducer';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Media from 'react-media';
import TradeNonOwned from './TradeNonOwned/tradeNonOwned';
import './nonowned.css';

class NonOwned extends Component {
  constructor() {
    super()
    this.handleAddToWatchlist = this.handleAddToWatchlist.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleAddToWatchlist() {
    let { addCompany, addSymbol } = this.props;
    axios.post(`/api/add`, { addCompany, addSymbol }).then(res => {
      this.props.updateNonOwnedStocks(res.data)
    })

  }

  async handleRemove(id) {
    axios.delete(`/api/remove/${id}`).then(res => {
      this.props.updateNonOwnedStocks(res.data);
    })
  }

  render() {

    const nonOwnedStockList = this.props.nonOwnedStocks.map((element, index) => {

      return (
        <Tbody className="nonowned-tbody" key={index}>
          <Tr className="nonowned-tr">
            <Td className="nonowned-Td">{element.stock_name}</Td>
            <Td className="nonowned-Td">{element.symbol}</Td>
            <Td className="nonowned-Td">{this.props.quotes[element.symbol].quote.latestPrice}</Td>
            <Td className="nonowned-Td">{this.props.quotes[element.symbol].quote.previousClose}</Td>
            {this.props.quotes[element.symbol].quote.change >= 0 ?
              <Td className="nonowned-table-positive">{this.props.quotes[element.symbol].quote.change}</Td> : <Td className="nonowned-table-negative">{this.props.quotes[element.symbol].quote.change}</Td>}
            <Td className="nonowned-Td-buy">
              <Popup trigger={<button className="nonowned-buy">Buy</button>} position="right" >
                <TradeNonOwned currentPurchase={element} purchasePrice={this.props.quotes[element.symbol].quote.latestPrice} />
              </Popup>
            </Td>
            <Td className="nonowned-Td-remove">
              {/* <div> */}
                <button className="remove" onClick={() => this.handleRemove(element.id)}
                >Remove</button>
              {/* </div> */}
            </Td>
          </Tr>
        </Tbody>
      )

    })

    return (
      <div className="Watchlist">
        <Table className="nonowned-table">
          <Thead className="nonowned-thead">
            <Tr className="nonowned-tr">
              <Th className="nonowned-th">Name</Th>
              <Th className="nonowned-th">Symbol</Th>
              <Th className="nonowned-th">Current Price</Th>
              <Th className="nonowned-th">Previous Close</Th>
              <Th className="nonowned-th">Change</Th>
              <Media
                query="(min-width: 750px)"
                render={() => <Th className="nonowned-th" colspan="2">Action</Th>} />
            </Tr>
          </Thead>
          {nonOwnedStockList}

        </Table>
        <form className="nonowned-add">
          Add a company to your watchlist:<br />
          <div>
            <input className="nonowned-add-company" type="text" placeholder="Company Name" onChange={e => this.props.updateAddCompany(e.target.value)} />
            <input className="nonowned-add-symbol" type="text" placeholder="Trade Symbol" onChange={e => this.props.updateAddSymbol(e.target.value)} />
            <div>
              <input className="nonowned-add-button" type="submit" onClick={this.handleAddToWatchlist} />
            </div>
          </div>
        </form>
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
  const { quotes, nonOwnedStocks, addCompany, addSymbol } = state;
  return {
    quotes,
    nonOwnedStocks,
    addCompany,
    addSymbol
  }
}

export default connect(
  mapStateToProps, { updateAddCompany, updateAddSymbol, updateHandleAddToWatchlist, updateTab, updateBuySell, updateNonOwnedStocks }
)(NonOwned);