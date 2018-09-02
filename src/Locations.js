import React, { Component } from 'react'

class Locations extends Component {
  render() {
    console.log('Props', this.props)
    return (
    <ol className='contact-list'>
      {this.props.locations.map((location) => (
        <li key={location.id} className='contact-list-item'>
          <h1>{location.title}</h1>
        </li>
      ))}
    </ol>
    )
  }
}

export default Locations