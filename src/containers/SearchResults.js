import React, { Component } from 'react'
import Result from '../components/Result'

class SearchResults extends Component {
  render() {
    const resultsStyle = {
      marginLeft: '300px',
      padding: '0 10px',
      listStyle: 'none'
    }

    return(
      <div style={resultsStyle}>
        <h1>Search Results</h1>
        {this.props.numberOfResults
          ? <h3>Number of results - {this.props.numberOfResults}</h3>
          : <div></div>
        }
        {this.props.results.map((volume, index) => 
            <li 
              key={volume.id}>
              <Result
                onClick={this.props.onClickResult}
                volumeData={volume}
                number={index}/>
            </li>
          )}
      </div>
    )
  }
}

export default SearchResults