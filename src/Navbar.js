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
      <span tabIndex="0" style={{fontSize: 30, cursor: 'pointer'}} onClick={this.openNav}>&#9776; Neighbors</span>

      </div>
    )
  }
}

export default Navbar