import React, { Component } from 'react'
import Sidebar from'./containers/Sidebar.js'
import SearchResults from './containers/SearchResults.js'
import {searchVolumes, searchIssues} from './lib/api.js'
import IssueList from './containers/IssueList.js'
import {COMIC_VINE_API_KEY} from './key.js'
import {misterMiracle, manOfSteel} from './tempData.js'
import './App.css'

const proxy = 'https://cors-anywhere.herokuapp.com/'
const baseURL = proxy + 'https://comicvine.gamespot.com/api'
//const proxy = 'https://allorigins.me/get?method=raw&url='
//const proxy = 'https://crossorigin.me/'

// load api key file
const apiKey = COMIC_VINE_API_KEY

// ******************
// Main app component
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchText: '',
      searchResults: [],
      collections: [misterMiracle, manOfSteel],
      isSearch: false,
      numberOfResults: 0,
      collectionSelected: ''
    }

    this.handleSearchTextChange = this.handleSearchTextChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleOnClickCollection = this.handleOnClickCollection.bind(this)
    this.handleOnClickResult = this.handleOnClickResult.bind(this)
  }

  handleSearchTextChange(text) {
    this.setState({searchText: text})
  }

  handleSearchSubmit() {
    // activate search view on main display
    // previous search results are cleaned now too
    this.setState({
      isSearch: true,
      searchResults: [],
      numberOfResults: 0
    })

    // fetch volume information
    if (this.state.searchText) {
      
      // searchVolumes returns a promise
      const volumesPromises = searchVolumes(this.state.searchText.replace(' ', '%20'), baseURL, apiKey, 0)

      volumesPromises.then(results => {
        let volumeList = results.map(volume => {
          if (typeof(volume) != Promise) {
            return {
              id: volume.id,
              title: volume.name,
              totalIssues: volume.count_of_issues,
              img: volume.image.thumb_url,      
              publishingDate: volume.start_year,
            }
          } else {
            return {}
          }
        })

        this.setState({
          searchResults: volumeList,
        })
      })
    }
  }

  // when a collection on the sidebar is clicked it will show info on the main display
  handleOnClickCollection(collection) {
    this.setState({
      isSearch: false,
      collectionSelected: collection 
    })
  }

  // when a result is clicked it will be added to the sidebar list
  handleOnClickResult(result) {
    let collections = this.state.collections.slice()

    // add current volume info to collections on sidebar
    collections.push({
      id: result.id,
      title: result.title,
      totalIssues: result.totalIssues,
      ownedIssues: 0,
      status: 'Placeholder',
      img: result.img,
      publishingDate: result.publishingDate,
      issues: []
    })
    
    this.setState({
      collections: collections
    })
  }

  render() {
    return (
      <div className="App">
        <Sidebar
          collections={this.state.collections}
          searchText={this.state.searchText}
          onValueChange={this.handleSearchTextChange}
          onSubmit={this.handleSearchSubmit}
          onClickCollection={this.handleOnClickCollection}
        />
        {/* Main display can show either a search result or a collection from the sidebar */}
        {this.state.isSearch
          ? <SearchResults 
              results={this.state.searchResults}
              onClickResult={this.handleOnClickResult}
              numberOfResults={this.state.numberOfResults}
            />
          : <IssueList 
              collection={this.state.collectionSelected}
            />
        }
      </div>
    );
  }
}

export default App
