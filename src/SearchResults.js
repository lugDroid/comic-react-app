import React, { Component } from 'react'

class SearchResults extends Component {
  render() {
    const resultsStyle = {
      marginLeft: '300px',
      padding: '0 10px',
      listStyle: 'none'
    }

    return (
      <div style={resultsStyle}>
        <h1>Search Results</h1>
        {this.props.results.map(volume => <li key={volume.id}>{
          (volume.start_year ? volume.start_year : 'No Year')
           + ' - ' + volume.title
           + (volume.deck? ' (' + volume.deck + ')' : '') 
          }</li>)}
      </div>
    )
  }
}

export default SearchResults