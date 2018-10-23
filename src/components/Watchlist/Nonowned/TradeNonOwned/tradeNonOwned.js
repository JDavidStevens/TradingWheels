import React, { Component } from 'react';
import axios from 'axios';
// import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { updateBuySell, updateTradeQty, updateOrderType, updateMyStocks } from '../../../../ducks/reducer';
import LimitStopNonOwned from './limitStopNonOwned';


class TradeOwned extends Component {
    constructor() {
        super()
        this.handleNewPurchase=this.handleNewPurchase.bind(this);
    }

   
    handleNewPurchase(id,name,symbol,qty,basis){
axios.post(`/api/newPurchase`,{name,symbol,qty,basis}).then(
    axios.delete(`/api/remove/${id}`)
)
    }

    

    render() {
        console.log("buySell",this.props.buySell);
let basis = parseInt(this.props.tradeQty) * parseInt(this.props.purchasePrice) 
        
        return (
            <div className="Trade">
                <h1>{this.props.currentPurchase.symbol}</h1>
                <form>
                   Purchase Quantity:
                        <input placeholder="Shares" onChange={e => this.props.updateTradeQty(e.target.value)} />
                    
                    Order Type:
                    <select onChange={e => this.props.updateOrderType(e.target.value)}>
                        <option>--Select--</option>
                        <option value="Buy ">Buy ASAP</option>
                        <option value="trigger">Set a Trigger Price</option>
                    </select>
                    <br /><br />
                    {(this.props.orderType === "trigger")
                        ? (<LimitStopNonOwned nonOwnedTrigger={this.props.currentPurchase} currentPriceNonOwned={this.props.purchasePrice}/>) : (this.props.orderType=== "Buy ")
                                ? (<input type="submit" onClick={() => this.handleNewPurchase(this.props.currentPurchase.id,this.props.currentPurchase.stock_name,this.props.currentPurchase.symbol,this.props.tradeQty,basis)} />):(null) }
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { buySell, tradeQty, orderType } = state;
    return {
        buySell,
        tradeQty,
        orderType
    }
}

export default connect(
    mapStateToProps, { updateBuySell, updateTradeQty, updateOrderType, updateMyStocks }
)(TradeOwned);