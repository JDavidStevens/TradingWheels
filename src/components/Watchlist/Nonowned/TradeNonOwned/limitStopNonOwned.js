import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateTargetPrice } from '../../../../ducks/reducer'

class LimitStopNonOwned extends Component {
    constructor() {
        super()

        this.handlePendingOrder = this.handlePendingOrder.bind(this);
    }


    handlePendingOrder(id,company, symbol, qty, triggerPrice, type, tradeType) {
        console.log("pre-axios", company, symbol, qty, triggerPrice, type, tradeType)
        axios.post('/api/orders', { company, symbol, qty, triggerPrice, type, tradeType }).then(
            axios.delete(`/api/remove/${id}`)
        )

    }


    render() {

        let { id,stock_name, symbol} = this.props.nonOwnedTrigger;
        let { currentPriceNonOwned } = this.props;

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
                    <input type="submit" onClick={() => this.handlePendingOrder(id,stock_name, symbol, this.props.tradeQty, this.props.targetPrice, orderTypeSelector(currentPriceNonOwned, this.props.targetPrice), buy)} />
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
    mapStateToProps, { updateTargetPrice }
)(LimitStopNonOwned);