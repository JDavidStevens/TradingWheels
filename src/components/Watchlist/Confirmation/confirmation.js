import React, { Component } from 'react';
import {connect} from 'react-redux';
// import axios from 'axios';
// import {Link} from 'react-router-dom';

class Confirmation extends Component{
    render(){
        return(
            <div>Confirmation</div>
        )
    }
}

function mapStateToProps(state) {
    const { buySell, tradeQty, orderType, targetPrice } = state;
    return {
        buySell,
        tradeQty,
        orderType,
        targetPrice
    }
}

export default connect(mapStateToProps)(Confirmation)