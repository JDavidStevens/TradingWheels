import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Zoom } from 'react-slideshow-image';
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
  }


  componentDidMount() {
    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${this.state.symbols}&types=quote`).then(response => {
      console.log("response", response.data)
      this.setState({ spy: response.data.SPY.quote.changePercent, dia: response.data.DIA.quote.changePercent, oneq: response.data.ONEQ.quote.changePercent })
    })
  }

  render() {

const fadeImages=['https://d1qq9lwf5ow8iz.cloudfront.net/live-images-1/ImageDetail_7d2ca19d-c58f-4e6c-a07e-f6eb1682be2f_Large', 'http://static1.squarespace.com/static/56200fcee4b02025054662d7/56201861e4b007035b102ef9/56ef4f4d86db433c87c99121/1505398624034/wall+street.jpg?format=1000w', 'https://www.nyse.com/publicdocs/images/NYSE_ExchangeData_RealTime_media_tile.jpg'];

const fadeProperties={
  duration: 3000,
  transitionDuration: 500,
  infite: true,
  arrows: false
}

const Slideshow = () => {
  return(
    <Zoom {...fadeProperties}>
    <div className='each-fade'>
    <div className="image-container">
    <img src={fadeImages[0]}/>
    </div>
    </div>
    <div className='each-fade'>
    <div className="image-container">
    <img src={fadeImages[1]}/>
    </div>
    </div>
    <div className='each-fade'>
    <div className="image-container">
    <img src={fadeImages[2]}/>
    </div>
    </div>
    </Zoom>
  )
}

    function percent(num) {
      var multiplier = num * 100;
      var quote = multiplier.toFixed(2)
      return quote;
    }

    return (

      <div className="login">
        <div className="container">
          {Slideshow()}
          
          <table className="centered">
            <tr>
              <th>S&P 500</th>
              <th>NASDAQ</th>
              <th>DOW</th>
            </tr>
            <tr>
              {percent(this.state.spy) >= 0 ? <td className="positive">{percent(this.state.spy)}%</td> : <td className="negative">{percent(this.state.spy)}%</td>}
              {percent(this.state.oneq) >= 0 ? <td className="positive">{percent(this.state.oneq)}%</td> : <td className="negative">{percent(this.state.oneq)}%</td>}
              {percent(this.state.dia) >= 0 ? <td className="positive">{percent(this.state.dia)}%</td> : <td className="negative">{percent(this.state.dia)}%</td>}
            </tr>
          </table>
        </div>
        <div>
          <button className="login-button"><Link to='/list' className="login-link">Login/Register</Link></button>
        </div>
      </div>
    );
  }
}

export default Login;