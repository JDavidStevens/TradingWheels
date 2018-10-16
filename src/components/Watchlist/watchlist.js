import React, { Component } from 'react';
import axios from 'axios';


class Watchlist extends Component {
  constructor() {
    super()

    this.state = {
      allStocks: [],
      restock:[],
      name: '',
      symbols: [],
      quotes: {}
    }

  }


  async componentDidMount() {
    const res = await axios.get('/api/nonowned')
    let filteredSymbols = res.data.map(element => element.symbol)
    this.setState({ allStocks: res.data, symbols: filteredSymbols })

    const response = await axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.state.symbols}&types=quote`)
    console.log("response.data", response.data.AAPL)
    console.log("response.data.AAPL.quote", response.data.AAPL.quote)
    console.log("response.data.AAPL.quote.latestPrice", response.data.AAPL.quote.latestPrice)
    this.setState({ quotes: response.data, restock:res.data})
  }


  render() {
    // console.log("Symbols:",this.state.symbols)
    console.log("Quotes:", this.state.quotes)

    const fullStockList = this.state.restock.map((element, index) => {
      

      console.log("test", this.state.quotes[element.symbol])
      if(!this.state.quotes[element.symbol].quote){
        return null
      }
      return (
        <tr key={index}>
          <td>{element.stock_name}</td>
          <td>{element.symbol}</td>
          <td>{this.state.quotes[element.symbol].quote.latestPrice}</td>
          <td>{this.state.quotes[element.symbol].quote.previousClose}</td>
          <td>{this.state.quotes[element.symbol].quote.change}</td>
        </tr>
      )
    })

    return (
      <div className="Watchlist">

        {this.state.allStocks[0]?<h1>Hello {this.state.allStocks[0].firstname}!</h1>:''}
        
        <h1>Watchlist</h1>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Symbol</th>
              <th>Current Price</th>
              <th>Previous Close</th>
              <th>Change</th>
            </tr>
            {/* {this.state.quotes!=={}?(fullStockList):('')} */}
            {fullStockList}
           
          </tbody>
        </table>

      </div>
    );
  }
}

export default Watchlist;