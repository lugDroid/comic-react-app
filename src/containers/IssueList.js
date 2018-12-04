import React, { Component } from 'react'
import CollectionInfo from '../components/CollectionInfo'
import Issue from '../components/Issue'

class IssueList extends Component {
  render() {
    return (
      <div>
        <CollectionInfo collection={this.props.collection}/>
      </div>
    )
  }
}

export default IssueList