import React, { Component } from 'react'
import CollectionSummary from '../components/CollectionSummary'
import Search from '../components/Search'

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
        {this.props.collections.map(collection => {
          return <CollectionSummary key={collection.id}
          data={collection}
          onClick={this.props.onClickCollection}
        />
        })}
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
