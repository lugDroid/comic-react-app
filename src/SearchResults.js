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
        {this.props.results.map(volume => <li key={volume.id}>{
          volume.start_year
           + ' - ' + volume.title
           + '(' + volume.deck + ')'
          }</li>)}
      </div>
    )
  }
}

export default SearchResults