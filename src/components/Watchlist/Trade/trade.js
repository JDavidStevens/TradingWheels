import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Trade extends Component {
  render() {
    // console.log("props",this.props)
    return (
      <div className="Trade">
        Trade
        <h1>{this.props.currentTrade.symbol}</h1>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   const { currentTrade } = state;
//   return {
//     currentTrade
//   }
// }

// export default connect(mapStateToProps)(Trade);
export default Trade;