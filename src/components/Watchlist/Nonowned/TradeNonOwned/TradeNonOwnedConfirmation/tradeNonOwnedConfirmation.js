import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import './tradenonownedconfirmation.css'

class NonownedConfirmation extends Component{
    constructor(props){
        super(props)
        this.state={
            finalOwnedTotal: parseInt(this.props.tradeQty)*parseInt(this.props.orderInfo[1])
        }
    }

    onToken = token => {
        token.card = void 0;
        axios.post('/api/payment',{token, amount:this.state.finalOwnedTotal})
        .then(console.log("stripe response"))
        // (()=>{this.props.history.push('/list')})
    }

    render(){

    return(
        <div className="trade-nonowned-confirm">
        <ul className="checkmark">
        <li></li>
        </ul>
        <div><p className="confirm-statement-no">Your order to Buy {this.props.tradeQty} shares of {this.props.orderInfo[0]} has been submitted.</p> 
        <Link className="homepage-link" to='/list'>Return to My Homepage</Link>
        </div>
        {/* {(this.props.orderType ==="trigger")?(<div><p className="confirm-statement-no">Your order to Buy {this.props.tradeQty} shares of {this.props.orderInfo[0]} has been submitted.</p> 
        <Link className="homepage-link" to='/list'>Return to My Homepage</Link>
        </div>):(
        <div>
           <p className="confirm-statement-no"> Your order to Buy {this.props.tradeQty} shares of {this.props.orderInfo[0]} has been submitted. Your total is ${this.state.finalOwnedTotal}.</p>
           <div>
               <StripeCheckout className="stripe-nonowned" token={this.onToken} stripeKey={process.env.REACT_APP_STRIPEKEY}
               amount={this.state.finalOwnedTotal*100}/>
           </div>
           </div>)
        } */}
        </div>
    )
    }
}



function mapStateToProps(state) {
    const {orderInfo,buySell,tradeQty,orderType } = state;
    return {
        orderInfo,
        buySell,
        tradeQty,
        orderType
    }
}

export default connect(
    mapStateToProps
)(NonownedConfirmation);