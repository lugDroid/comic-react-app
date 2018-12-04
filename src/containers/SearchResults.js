import React, { Component } from 'react'

class Result extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.onClick(this.props.volumeData)
  }

  render() {
    // define styles
    const containerStyle = {
      margin: '0 10px 10px',
      overflow: 'auto'
    }
    const thumbStyle = {
      float: 'left'
    }
    const imgStyle = {
      display: 'block',
      width: '100px'
    }
    const contentStyle = {
      marginLeft: "110px",
      lineHeigh: 0
    }

    return(
      <div 
        style={containerStyle}
        onClick={this.handleClick}>
        <div style={thumbStyle}>
          <img 
            alt="Collection cover" 
            src={this.props.volumeData.img} 
            style={imgStyle}>
          </img>
        </div>
        <div style={contentStyle}>
          <h3>{this.props.volumeData.title}</h3>
          <h4>{this.props.volumeData.publishingDate}</h4>
          <h4>{this.props.volumeData.totalIssues} Issues</h4>
        </div>
      </div>
    )
  }
}

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
        {this.props.results.map(volume => 
            <li 
              key={volume.id}>
              <Result
                onClick={this.props.onClickResult}
                volumeData={volume}
              />
            </li>
          )}
      </div>
    )
  }
}

export default SearchResults