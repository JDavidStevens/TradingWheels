import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import {updatePending} from '../../../ducks/reducer';


class Pending extends Component {
    constructor(){
        super()

        this.handleCancel=this.handleCancel.bind(this);
    }

    handleCancel(id){
        axios.delete(`/api/cancel/${id}`).then(res=>{
            this.props.updatePending(res.data)
        })
    }
    
    render() {
console.log("pendpage",this.props.pending)



        const pendingBuyList = this.props.pending.map((element, index) => {
            if (element.trade_type === "Buy ") {
                return (
                    <tbody key={index}>
                        <tr>
                            <td>{element.stock_name}</td>
                            <td>{element.symbol}</td>
                            <td>{element.order_type}</td>
                            <td>{element.shares}</td>
                            <td>{element.trigger_price}</td>
                            <td>{this.props.quotes[element.symbol].quote.latestPrice}</td>
                            <td><button onClick={()=>this.handleCancel(element.id)}>Cancel Order</button></td>
                        </tr>
                    </tbody>
                )
            }else{return null}
        })
        console.log("pendpagemaps",pendingBuyList)
        const pendingSaleList = this.props.pending.map((element, index) => {
            if (element.trade_type === "Sell ") {
                return (
                    <tbody key={index}>
                        <tr>
                            <td>{element.stock_name}</td>
                            <td>{element.symbol}</td>
                            <td>{element.order_type}</td>
                            <td>{element.shares}</td>
                            <td>{element.trigger_price}</td>
                            <td>{this.props.quotes[element.symbol].quote.latestPrice}</td>
                            <td><button onClick={()=>this.handleCancel(element.id)}>Cancel Order</button></td>
                        </tr>
                    </tbody>
                )
            }else{return null}            
        })
        
        return (
            <div>
                <div>
                <h3>Pending Purchases</h3>
                {pendingBuyList!==null?
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Order Type</th>
                            <th>Share Quantity</th>
                            <th>Trigger Price</th>
                            <th>Current Price</th>
                        </tr>
                    </thead>
                    {pendingBuyList}
                </table>:<p>No pending purchases at this time</p>}
                </div>
                <div>
                <h3>Pending Sales</h3>
                {pendingSaleList!==null?
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Symbol</th>
                            <th>Order Type</th>
                            <th>Share Quantity</th>
                            <th>Trigger Price</th>
                            <th>Current Price</th>
                        </tr>
                    </thead>
                    {pendingSaleList}
                </table>:<p>No pending sales at this time</p>}
                </div>
            </div>

        )
    }
}

function mapStateToProps(state) {
    const { pending,quotes } = state;
    return {
        pending,quotes
    }
}

export default connect(mapStateToProps,{updatePending})(Pending)