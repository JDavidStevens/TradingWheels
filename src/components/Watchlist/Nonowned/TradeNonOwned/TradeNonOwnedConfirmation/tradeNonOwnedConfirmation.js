import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// import {Link} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import stripe from './stripekey';

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
        .then(()=>{this.props.history.push('/list')})
    }

    render(){

    return(
        <div>
           <p> Your order to By {this.props.tradeQty} shares of {this.props.orderInfo[0]} has been submitted. Your total is ${this.state.finalOwnedTotal}.</p>
           <div>
               <StripeCheckout token={this.onToken} stripeKey={stripe.pub_key}
               amount={this.state.finalOwnedTotal*100}/>
           </div>
        </div>
    )
    }
}



function mapStateToProps(state) {
    const {orderInfo,buySell,tradeQty } = state;
    return {
        orderInfo,
        buySell,
        tradeQty
    }
}

export default connect(
    mapStateToProps
)(NonownedConfirmation);