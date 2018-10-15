import React, { Component } from 'react';
import axios from 'axios';

class Watchlist extends Component {
constructor(){
  super()

  this.state={
    allStocks:[],
    name: ''
  }
}

componentDidMount(){
  axios.get('/api/nonowned').then(res=>{
    this.setState({allStocks:res.data,name:res.data[0].firstname})
  })
}


  render() {
    console.log("allstocks:",this.state.allStocks[0])
    console.log("name:",this.state.name)

    


const fullStockList= this.state.allStocks.map((element,index)=>{
  return(    
      <tr key={index}>
        <td>{element.stock_name}</td>
        <td>{element.symbol}</td>
        <td>Current Price</td>
        <td>Previous Close</td>
        <td>Change</td>
      </tr>    
  )
})

    return (
      <div className="Watchlist">
     <h1>Hello {this.state.name}!</h1>
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
        {fullStockList}
        </tbody>
        </table>
      </div>
    );
  }
}

export default Watchlist;