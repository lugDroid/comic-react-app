import React, { Component } from 'react'

// Temporary data
const misterMiracle = {
  id: 103397,
  title: 'Mister Miracle',
  totalIssues: 12,
  ownedIssues: 12,
  status: 'Finished',
  img: 'https://static.comicvine.com/uploads/scale_small/6/67663/5996667-01.jpg',
  publishingDate: 2017,
  issues: []
}

const manOfSteel = {
  id: 111145,
  title: 'Man of Steel',
  totalIssues: 6,
  ownedIssues: 3,
  status: 'Ongoing',
  img: 'https://static.comicvine.com/uploads/scale_small/6/67663/6451280-01.jpg',
  publishingDate: 2018,
  issues: []
}


class CollectionSummary extends Component {
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
      <div style={containerStyle}>
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

class Search extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.props.onValueChange(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Search New Collection
          <input 
            type="text" 
            value={this.props.searchText} 
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Search" />
      </form>
    )
  }
}

class Sidebar extends Component {
  render() {
    const sideStyle = {
      borderRight: '1px solid white',
      width: '300px',
      height: '100%',
      position: 'fixed',
      zIndex: 1,
      left: 0,
      overflowX: 'hidden'
    }

    return (
      <div style={sideStyle}>
        <h2>Your Collections</h2>
        <CollectionSummary data={misterMiracle}/>
        <CollectionSummary data={manOfSteel}/>
        <Search
          searchText={this.props.searchText}
          onValueChange={this.props.onValueChange}
          onSubmit={this.props.onSubmit}
        />
      </div>
    )
  }
}

export default Sidebar
