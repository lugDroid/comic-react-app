import React, { Component } from 'react'

class SearchResults extends Component {
  render() {
    const resultsStyle = {
      marginLeft: '300px',
      padding: '0 10px'
    }

    return (
      <div style={resultsStyle}>
        <h1>Search Results</h1>
        {this.props.results.map(volume => <li>volume.title</li>)}
      </div>
    )
  }
}

export default SearchResults