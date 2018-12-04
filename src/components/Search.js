import React, { Component } from 'react'

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

export default Search