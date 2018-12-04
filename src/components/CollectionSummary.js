import React, { Component } from 'react'

// displays information about saved collections
class CollectionSummary extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  // When clicked information about the collection
  // will be displayed on the main window
  handleClick() {
    this.props.onClick(this.props.data)
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
    
    return (
      <div style={containerStyle} onClick={this.handleClick}>
        <div style={thumbStyle}>
          <img style={imgStyle} alt="Collection Cover" src={this.props.data.img}></img>
        </div>
        <div style={contentStyle}>
          <h3>{this.props.data.title}</h3>
          <p>{this.props.data.ownedIssues}/{this.props.data.totalIssues} Issues</p>
          <p>{this.props.data.status}</p>
        </div>
      </div>
    )
  }
}

export default CollectionSummary