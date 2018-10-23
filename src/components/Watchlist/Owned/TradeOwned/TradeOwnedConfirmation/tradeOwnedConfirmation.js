import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class OwnedConfirmation extends Component{
//     constructor(){
//         super()
// }
    render(){
        let finalOwnedTotal = parseInt(this.props.tradeQuantity)*parseInt(this.props.orderInfo[1])
    return(
        <div>
           <p> Your order to {this.props.buySell} {this.props.tradeQuantity} shares of {this.props.orderInfo[0]} has been submitted. Your total is {finalOwnedTotal}.</p>
           <div>
               {this.props.buySell==="Sell "?
               <Link to='/list'>Return to My Homepage</Link>:<button>Payment</button>}
           </div>
        </div>
    )
    }
}



function mapStateToProps(state) {
    const {orderInfo,buySell,tradeQuantity } = state;
    return {
        orderInfo,
        buySell,
        tradeQuantity
    }
}

export default connect(
    mapStateToProps
)(OwnedConfirmation);