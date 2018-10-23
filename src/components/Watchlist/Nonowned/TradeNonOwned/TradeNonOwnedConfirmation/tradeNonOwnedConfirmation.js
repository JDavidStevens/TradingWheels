import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class NonownedConfirmation extends Component{

    render(){

console.log("oi",this.props)

        let finalOwnedTotal = parseInt(this.props.tradeQty)*parseInt(this.props.orderInfo[1])
    return(
        <div>
           <p> Your order to By {this.props.tradeQty} shares of {this.props.orderInfo[0]} has been submitted. Your total is ${finalOwnedTotal}.</p>
           <div>
               <button>Payment</button>
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