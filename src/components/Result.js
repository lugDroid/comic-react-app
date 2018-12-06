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
            src={this.props.volumeData.image.thumb_url} 
            style={imgStyle}>
          </img>
        </div>
        <div style={contentStyle}>
          <h3>{this.props.volumeData.start_year} - {this.props.volumeData.name}</h3>
          <h4>
            {this.props.volumeData.publisher && this.props.volumeData.publisher.name}
          </h4>
          <h4>{this.props.volumeData.count_of_issues} Issues</h4>
          <p>
            {this.props.volumeData.description && this.props.volumeData.description.replace(/<[^>]+>/g, '')}
          </p>
        </div>
      </div>
    )
  }
}

export default Result