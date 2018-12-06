import React, { Component } from 'react'
import Radium from 'radium'

const styles = {
  container: {
    margin: '0 10px 10px',
    overflow: 'auto',
    ':hover': {
      color: 'red',
      backgroundColor: 'red'
    },
  },
  thumbnail: {
    float: 'left'
  },
  imgage: {
    display: 'block',
    width: '100px'
  },
  info: {
    marginLeft: "110px",
    lineHeigh: 0
  }
}

class Result extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.onClick(this.props.volumeData)
  }

  render() {
    return(
      <div 
        key={this.props.volumeData.id}
        style={styles.container}
        onClick={this.handleClick}>
        <div style={styles.thumbnail}>
          <img 
            alt="Collection cover" 
            src={this.props.volumeData.image.thumb_url} 
            style={styles.image}>
          </img>
        </div>
        <div style={styles.info}>
          <h3>{this.props.volumeData.start_year} - {this.props.volumeData.name}</h3>
          <h4>
            {this.props.volumeData.publisher && this.props.volumeData.publisher.name}
          </h4>
          <h4>{this.props.volumeData.count_of_issues} Issues</h4>
          <p>
            {this.props.volumeData.description && this.props.volumeData.description.replace(/<[^>]+>/g, '').substr(0, 255)}...
          </p>
        </div>
      </div>
    )
  }
}

export default Radium(Result)