import React, { Component } from 'react'
import './styles/Home.css';

class Navbar extends Component {
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    console.log("clicked")
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  render() {
    return (
      <div>
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>×</a>
          <span style={{color: 'white', paddingRight: '10px', paddingLeft: '10px'}}>Search</span><input type="search" name="search"/>
          <a href="#">Restaurant</a>
          <p className="restaurantName">Restaurant</p>
        </div>
        <span  style={{fontSize: 30, cursor: 'pointer'}} onClick={this.openNav}>&#9776; Neighbors</span>
      </div>
    )
  }
}

export default Navbar