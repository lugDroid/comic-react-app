import React, { Component } from 'react'

class CollectionInfo extends Component {
  render() {
    const style = {
      marginLeft: '300px',
      padding: '0 10px',
      listStyle: 'none'
    }

    return (
      <div style={style}>
        <h3>{this.props.collection.title}</h3>
      </div>
    )
  }
}

export default CollectionInfo