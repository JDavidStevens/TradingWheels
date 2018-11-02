import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { updateTargetPrice,updateOrderInfo } from '../../../../ducks/reducer'

class LimitStopOwned extends Component {
    constructor() {
        super()

        this.handlePendingOrder = this.handlePendingOrder.bind(this);
    }


    handlePendingOrder(company, symbol, qty, triggerPrice, type, tradeType) {
        axios.post('/api/orders', { company, symbol, qty, triggerPrice, type, tradeType })

    }


    render() {

        let { stock_name, symbol, shares } = this.props.currentTrade;
        let { currentPrice } = this.props;

        function orderTypeSelector(current, requested, type) {
            if (type === "Sell " && current <= requested) {
                return "Limit"
            }else if(type === "Sell All Shares " && current <= requested){
                return "Limit"
            }else if (type === "Buy " && current >= requested) {
                return "Limit"
            } else {
                return "Stop Loss"
            }
        }

        function tradeTypeConverter(str) {
            if (str === 'Sell All Shares ') {
                return "Sell "
            } else {
                return str
            }
        }

        let orderConfirmInfo= [symbol,currentPrice]

        return (
            <div>

                <div>

                    <input placeholder="Desired Target Price" onChange={e => this.props.updateTargetPrice(e.target.value)} />

                    {(this.props.buySell === "Sell All Shares ")
                        ? (<Link to='/oconfirm' onClick={()=>this.props.updateOrderInfo(orderConfirmInfo)}><input type="submit" onClick={
                            () => this.handlePendingOrder(stock_name, symbol, shares, this.props.targetPrice, orderTypeSelector(currentPrice, this.props.targetPrice, this.props.buySell), tradeTypeConverter(this.props.buySell))} /></Link>) : (this.props.buySell === "Buy " || this.props.buySell === "Sell ")
                            ? (<Link to='/oconfirm' onClick={()=>this.props.updateOrderInfo(orderConfirmInfo)}> <input type="submit" onClick={() => this.handlePendingOrder(stock_name, symbol, this.props.tradeQty, this.props.targetPrice, orderTypeSelector(currentPrice, this.props.targetPrice, this.props.buySell), this.props.buySell)} /></Link>) : (null)}
                </div>
            </div>

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

export default connect(
    mapStateToProps, { updateTargetPrice,updateOrderInfo }
)(LimitStopOwned);