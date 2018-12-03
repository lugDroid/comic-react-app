import React, { Component } from 'react'
import Sidebar from'./Sidebar.js'
import SearchResults from './SearchResults.js'
import {searchVolumes, searchIssues} from './addCollection.js'
import {COMIC_VINE_API_KEY} from './key.js'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchText: '',
      searchResults: [],
      collections: []
    }

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }

  handleSearchTextChange(text) {
    this.setState({searchText: text})
  }

  handleSearchSubmit() {
    // load api key file
    const apiKey = COMIC_VINE_API_KEY

    //const proxy = 'https://allorigins.me/get?method=raw&url='
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    //const proxy = 'https://crossorigin.me/'
    const baseURL = proxy + 'https://comicvine.gamespot.com/api'

    // fetch volume information
    if (this.state.searchText) {
      
      const volumesPromises = searchVolumes(this.state.searchText, baseURL, apiKey)
      volumesPromises.then(volumes => {
        let volumeList = volumes.map(volume => {
          return {
            id: volume.id,
            title: volume.name,
            startYear: volume.start_year,
            deck: volume.deck
          }
        })

        this.setState({
          searchResults: volumeList
        })
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Sidebar 
          searchText={this.state.searchText}
          onValueChange={this.handleSearchTextChange}
          onSubmit={this.handleSearchSubmit}
        />
        <SearchResults 
          results={this.state.searchResults}/>
      </div>
    );
  }
}

export default App
