import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { updateTargetPrice,updateOrderInfo } from '../../../../ducks/reducer'

class LimitStopNonOwned extends Component {
    constructor() {
        super()

        this.handlePendingOrder = this.handlePendingOrder.bind(this);
    }

    async handlePendingOrder(id, company, symbol, qty, triggerPrice, type, tradeType) {
       await axios.post('/api/orders', { company, symbol, qty, triggerPrice, type, tradeType })
       await axios.delete(`/api/remove/${id}`)
    }

    render() {

        let { id, stock_name, symbol } = this.props.nonOwnedTrigger;
        let { currentPriceNonOwned,targetPrice } = this.props;
        let orderConfirmInfo = [symbol,targetPrice]
        function orderTypeSelector(current, requested) {
            if (current >= requested) {
                return "Limit"
            } else {
                return "Stop Loss"
            }
        }

        let buy = "Buy "
        return (
            <div>
                <div>
                    <input placeholder="Desired Target Price" onChange={e => this.props.updateTargetPrice(e.target.value)} />
                    <Link to='/nconfirm' onClick={()=>this.props.updateOrderInfo(orderConfirmInfo)}><input type="submit" onClick={() => this.handlePendingOrder(id, stock_name, symbol, this.props.tradeQty, this.props.targetPrice, orderTypeSelector(currentPriceNonOwned, this.props.targetPrice), buy)} /></Link>
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
    mapStateToProps, { updateTargetPrice, updateOrderInfo }
)(LimitStopNonOwned);