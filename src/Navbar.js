import React, { Component } from 'react'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import './styles/Home.css';

class Navbar extends Component {
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    console.log("clicked")
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  state = {
    query: '',
    searchQueryLocations: this.props.locations
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    let showingLocations
    const match = new RegExp(escapeRegExp(query), 'i')
    showingLocations = this.props.locations.filter((location) => match.test(location.title))
    this.setState({searchQueryLocations: showingLocations})
  }

  render() {

    return (
      <div>
      <span  style={{fontSize: 30, cursor: 'pointer'}} onClick={this.openNav}>&#9776; Neighbors</span>
      {JSON.stringify(this.state.searchQueryLocations)}
        <div id="mySidenav" className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>×</a>
          <span style={{color: 'white', paddingRight: '10px', paddingLeft: '10px'}}>Search</span>
          <input type="text" name="search" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
          {this.state.searchQueryLocations.map((location) => (
            <a key={location.id} className='restaurantName' href={location.title}>
              {location.title}
            </a>
          ))}
        </div>
      </div>
    )
  }
}

export default Navbar