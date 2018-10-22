// import React, {Component} from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux';
// import {updateTargetPrice} from '../../../../ducks/reducer'

// class LimitStopNonOwned extends Component{
//     constructor(){
//         super()

// this.handlePendingOrder=this.handlePendingOrder.bind(this);
//     }


//     handlePendingOrder(company,symbol,qty,triggerPrice,type,tradeType){
//         console.log("pre-axios", company,symbol,qty,triggerPrice,type,tradeType)
// axios.post('/api/orders',{company,symbol,qty,triggerPrice,type,tradeType})

//     }


//     render(){

//         console.log("props",this.props,this.props.currentTrade,this.props.currentPrice)
//         let {stock_name,symbol,shares}= this.props.currentTrade;
//         let {currentPrice} = this.props;

// function orderTypeSelector(current,requested,type){
//     if(current >= requested){
//         return "Limit"
//     }else{
//         return "Stop Loss"
//     }
// }


//         return(
// <div>
    
//     <div>
         
//         <input placeholder="Desired Target Price" onChange={e=>this.props.updateTargetPrice(e.target.value)}/>

//         {(this.props.buySell === "Sell All Shares ")
//                             ? (<input type="submit" onClick={
//                                 () => this.handlePendingOrder(stock_name,symbol,shares,this.props.targetPrice,orderTypeSelector(currentPrice,this.props.targetPrice,this.props.buySell),tradeTypeConverter(this.props.buySell))} />) : (this.props.buySell === "Buy " || this.props.buySell==="Sell ")
//                                 ? (<input type="submit" onClick={() => this.handlePendingOrder(stock_name,symbol,this.props.tradeQty,this.props.targetPrice,orderTypeSelector(currentPrice,this.props.targetPrice,this.props.buySell),this.props.buySell)} />) : (null)}
//     </div>
// </div>

//         )
//     }
// }

// function mapStateToProps(state) {
//     const { buySell, tradeQty, orderType, targetPrice } = state;
//     return {
//         buySell,
//         tradeQty,
//         orderType,
//         targetPrice
//     }
// }

// export default connect(
//     mapStateToProps, { updateTargetPrice }
// )(LimitStopNonOwned);