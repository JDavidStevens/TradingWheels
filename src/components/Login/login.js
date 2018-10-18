import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './login.css';


class Login extends Component {

  constructor(){
    super()
    this.state={
      spy:0,
      dia:0,
      oneq:0,
      symbols:['spy','oneq','dia'],
      company:[]
    }
  }

  
 componentDidMount(){
    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.state.symbols}&types=quote`).then(response=>{
    console.log("response",response.data)
    this.setState({ spy: response.data.SPY.quote.changePercent,dia:response.data.DIA.quote.changePercent,oneq:response.data.ONEQ.quote.changePercent})})
   }

  render() {
    // let percent= this.state.spy * 100;
    // let sp = percent.toFixed(2)
    // let percent= this.state.spy * 100;
    // let sp = percent.toFixed(2)
    // let percent= this.state.spy * 100;
    // let sp = percent.toFixed(2)

    function percent(num){
    var multiplier = num * 100;
    var quote= multiplier.toFixed(2)
      return quote;
    
  }

    return (
      
      <div className="Login">
      
      <div>
      <h2>S&P 500</h2>{percent(this.state.spy)>=0?<p className="positive">{percent(this.state.spy)}%</p>:<p className="negative">{percent(this.state.spy)}%</p>}
      <h2>NASDAQ</h2>{percent(this.state.oneq)>=0?<p className="positive">{percent(this.state.oneq)}%</p>:<p className="negative">{percent(this.state.oneq)}%</p>}
      <h2>DOW</h2>{percent(this.state.dia)>=0?<p className="positive">{percent(this.state.dia)}%</p>:<p className="negative">{percent(this.state.dia)}%</p>} 
      </div>
      <button><Link to='/list' className="login-link">Login/Register</Link></button>
      </div>
    );
  }
}

export default Login;