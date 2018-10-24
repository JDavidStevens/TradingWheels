import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import stripe from '../../../Nonowned/TradeNonOwned/TradeNonOwnedConfirmation/stripekey';

class OwnedConfirmation extends Component{
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
            {this.props.buySell==="Sell All Shares "? <p>Your order to sell all shares of {this.props.orderInfo[0]} has been submitted. Your total is ${this.state.finalOwnedTotal}.</p>:
           <p> Your order to {this.props.buySell} {this.props.tradeQty} shares of {this.props.orderInfo[0]} has been submitted. Your total is ${this.state.finalOwnedTotal}.</p>}
           <div>
               {this.props.buySell==="Buy "?<StripeCheckout token={this.onToken} stripeKey='pk_test_jwGtWQMpsyUYQMo7GcDUsAPr'
               amount={this.state.finalOwnedTotal*100}/>:
               <Link to='/list'>Return to My Homepage</Link>}
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
)(OwnedConfirmation);