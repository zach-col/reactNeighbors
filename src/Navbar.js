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
      <span  style={{fontSize: 30, cursor: 'pointer'}} onClick={this.openNav}>&#9776; Neighbors</span>
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>×</a>
          <span style={{color: 'white', paddingRight: '10px', paddingLeft: '10px'}}>Search</span><input type="search" name="search"/>
          {this.props.locations.map((location) => (
            <a key={location.id} className='restaurantName'>
              <p>{location.title}</p>
            </a>
          ))}
        </div>
      </div>
    )
  }
}

export default Navbar