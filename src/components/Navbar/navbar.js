import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';


class Navbar extends Component {
  render() {
    return (
      <div className= "Navbar">
        <h1 className="navbar-title" >Trading Wheels</h1>
        <Link to='/' className="logout-button">Logout</Link>
      </div>
    );
  }
}

export default Navbar;