import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import { Fade } from 'react-slideshow-image';
import Media from 'react-media';
import './login.css';


class Login extends Component {

  constructor() {
    super()
    this.state = {
      spy: 0,
      dia: 0,
      oneq: 0,
      symbols: ['spy', 'oneq', 'dia'],
      company: []
    }

    this.login=this.login.bind(this);
    this.guestLogin=this.guestLogin.bind(this);
  }


  componentDidMount() {
    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.state.symbols}&types=quote`).then(response => {
      console.log("response", response.data)
      this.setState({ spy: response.data.SPY.quote.changePercent, dia: response.data.DIA.quote.changePercent, oneq: response.data.ONEQ.quote.changePercent })
    })
  }

  login(){
    let {REACT_APP_DOMAIN,REACT_APP_CLIENT_ID}=process.env;
    let uri = `${encodeURIComponent(window.location.origin)}/auth/callback`
    
    window.location=`https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${uri}&response_type=code`
  }

  guestLogin(){
    axios.post(`/api/auth/guest`,{sub:'Guest',email:'Guest',name: 'Guest'})
    .then(response=>{this.props.history.push('/list')})
  }

  render() {

    const fadeImages = ['https://s3-us-west-1.amazonaws.com/tradingwheelsinvestments/WallSt.jpg', 'https://s3-us-west-1.amazonaws.com/tradingwheelsinvestments/Bull.jpg', 'https://s3-us-west-1.amazonaws.com/tradingwheelsinvestments/NYSE.jpg'];

    const fadeProperties = {
      duration: 3000,
      transitionDuration: 900,
      infite: true,
      indicators: false,
      arrows: false
    }

    const Slideshow = () => {
      return (
        <Fade {...fadeProperties}>
          <div className='each-fade'>
            <div className="image-container">
              <img src={fadeImages[0]} alt=''/>
            </div>
          </div>
          <div className='each-fade'>
            <div className="image-container">
              <img src={fadeImages[1]} alt=''/>
            </div>
          </div>
          <div className='each-fade'>
            <div className="image-container">
              <img src={fadeImages[2]} alt=''/>
            </div>
          </div>
        </Fade>
      )
    }
    function percent(num) {
      var multiplier = num * 100;
      var quote = multiplier.toFixed(2)
      return quote;
    }

    return (

      <div className="login">
      <div className="login-image"></div>
      <div className="login-content">
        <h1 className="login-title">Trading Wheels</h1>
        <table className="centered">
        <tbody>
          <tr className="login-quote-titles">
            <th>S&P 500</th>
            <th>NASDAQ</th>
            <th>DOW</th>
          </tr>
          <tr className="login-quotes">
            {percent(this.state.spy) >= 0 ? <td className="positive">{percent(this.state.spy)}%</td> : <td className="negative">{percent(this.state.spy)}%</td>}
            {percent(this.state.oneq) >= 0 ? <td className="positive">{percent(this.state.oneq)}%</td> : <td className="negative">{percent(this.state.oneq)}%</td>}
            {percent(this.state.dia) >= 0 ? <td className="positive">{percent(this.state.dia)}%</td> : <td className="negative">{percent(this.state.dia)}%</td>}
          </tr>
          </tbody>
        </table>
        <div>
          <Media 
          query="(max-width: 699px)"
          render={()=><div>{Slideshow()}</div>}
          />
        </div>
        
        <div>
          <button className="login-button" onClick={this.login}>Login/Register</button>
          {/* <br/>
          <button className="login-button" onClick={this.guestLogin}>Guest Entrance</button> */}
        </div>
        <footer className="login-footer">
          Data provided for free by <a href="https://iextrading.com/developer">IEX</a><br/>  View <a href="https://iextrading.com/api-exhibit-a/">IEX’s Terms of Use</a> 
          <br/>
          Not a member of NYSE/FINRA. This site is for educational/practice purposes only. Actual stock trades cannot be placed through this site.
        </footer>
        </div>
      </div>
    );
  }
}

export default Login;