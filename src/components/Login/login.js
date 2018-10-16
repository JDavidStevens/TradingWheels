import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

  constructor(){
    super()
    this.state={
      sp:'',
      dow:'',
      nasdaq:'',
      symbols:['spy','oneq','dia']
    }
  }

 componentDidMount(){
    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.state.symbols}&types=quote`).then(response=>{
    console.log("response",response.data)
    this.setState({ sp: response.data.SPY.quote.changePercent,dow:response.data.DIA.quote.changePercent,nasdaq:response.data.ONEQ.quote.changePercent})})
  }

  render() {
    console.log("SPY",this.state.index)
    return (
      <div className="Login">
      <div>
        Login
      </div>
      <div>
      <h2>S&P 500</h2>{this.state.sp>=0?<p className="positive">{this.state.sp}</p>:<p className="negative">{this.state.sp}</p>}
      <h2>NASDAQ</h2>{this.state.nasdaq>=0?<p className="positive">{this.state.nasdaq}</p>:<p className="negative">{this.state.nasdaq}</p>}
      <h2>DOW</h2>{this.state.dow>=0?<p className="positive">{this.state.dow}</p>:<p className="negative">{this.state.dow}</p>}
      </div>
      </div>
    );
  }
}

export default Login;