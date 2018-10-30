import React, { Component } from 'react';
import './navbar.css';


class Navbar extends Component {
  render() {
    return (
      <div className= "Navbar">
        <h1 className="navbar-title" >Trading Wheels</h1>
        <button className="logout-button">Logout</button>
      </div>
    );
  }
}

export default Navbar;