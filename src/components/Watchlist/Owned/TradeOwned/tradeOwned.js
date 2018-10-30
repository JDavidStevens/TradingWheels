import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateBuySell, updateTradeQty, updateOrderType, updateMyStocks,updateOrderInfo } from '../../../../ducks/reducer';
import LimitStopOwned from './limitStopOwned';
import {Link} from 'react-router-dom';
import '../owned.css';


class TradeOwned extends Component {
    constructor() {
        super()
        this.handleSellAll = this.handleSellAll.bind(this);
        this.handleTradeShares = this.handleTradeShares.bind(this);
    }

    

handleSellAll(id) {
    axios.delete(`/api/sellall/${id}`).then(res=>{
        this.props.updateMyStocks(res.data);
    })}

    handleTradeShares(id,qty,price){
        axios.put(`/api/shares/${id}`,{qty,price})
        // .then(() => {
        //     this.props.history.push('/confirmation')
        // })
    }

    render() {

        console.log("quote",this.props.quotes)

        let sum = parseInt(this.props.tradeQty)+parseInt(this.props.currentTrade.shares);
        
        let addShares = parseInt(this.props.tradeQty)*parseInt(this.props.currentPrice)+parseInt(this.props.currentTrade.purchase_price);
        

        let difference=parseInt(this.props.currentTrade.shares)-parseInt(this.props.tradeQty);
        let reduceShares=parseInt(this.props.currentTrade.purchase_price)-parseInt(this.props.tradeQty)*parseInt(this.props.currentPrice);

        let orderConfirmInfo= [this.props.currentTrade.symbol,this.props.currentPrice]

        return (
            <div className="trade-owned">
                <h1 className="owned-current-trade-symbol">{this.props.currentTrade.symbol}</h1>
                <form>
                    Buy/Sell:
            <br />
                    <select onChange={e => this.props.updateBuySell(e.target.value)}>
                        <option>--Select--</option>
                        <option value="Buy ">Buy</option>
                        <option value="Sell ">Sell</option>
                        <option value="Sell All Shares ">Sell All Shares</option>
                    </select>
                    <br />
                    Quantity:
                        {this.props.buySell === "Sell All Shares " ? (<h5 className="owned-sell-all">{this.props.currentTrade.shares} Shares</h5>) : (
                        <input placeholder="Shares" onChange={e => this.props.updateTradeQty(e.target.value)} />
                    )}
                    Order Type:
                    <select onChange={e => this.props.updateOrderType(e.target.value)}>
                        <option>--Select--</option>
                        <option value={this.props.buySell}>{this.props.buySell} ASAP</option>
                        <option value="trigger">Set a Trigger Price</option>
                    </select>
                    <br /><br />
                    {this.props.orderType === "" ? (null) : (this.props.orderType === "trigger")
                        ? (<LimitStopOwned currentTrade={this.props.currentTrade} currentPrice={this.props.currentPrice}/>) : (this.props.orderType === "Sell All Shares ")
                            ? (<Link to='/oconfirm' onClick={()=>this.props.updateOrderInfo(orderConfirmInfo)}><input type="submit" onClick={() => this.handleSellAll(this.props.currentTrade.id)} /></Link>) : (this.props.orderType === "Buy ")
                                ? (<Link to='/oconfirm' onClick={()=>this.props.updateOrderInfo(orderConfirmInfo)}><input type="submit" onClick={() => this.handleTradeShares(this.props.currentTrade.id,sum,addShares)}/></Link>) : (<Link to='/oconfirm' onClick={()=>this.props.updateOrderInfo(orderConfirmInfo)}><input type="submit" onClick={() => this.handleTradeShares(this.props.currentTrade.id,difference,reduceShares)}/></Link>)}

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
    mapStateToProps, { updateBuySell, updateTradeQty, updateOrderType, updateMyStocks,updateOrderInfo }
)(TradeOwned);