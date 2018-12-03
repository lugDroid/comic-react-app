import React, { Component } from 'react'
import Sidebar from'./Sidebar.js'
import SearchResults from './SearchResults.js'
import {searchVolumes, searchIssues} from './addCollection.js'
import IssueList from './IssueList.js'
import {COMIC_VINE_API_KEY} from './key.js'
import './App.css'

const proxy = 'https://cors-anywhere.herokuapp.com/'
const baseURL = proxy + 'https://comicvine.gamespot.com/api'
//const proxy = 'https://allorigins.me/get?method=raw&url='
//const proxy = 'https://crossorigin.me/'

// load api key file
const apiKey = COMIC_VINE_API_KEY

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

// ******************
// Main app component
class App extends Component {
  constructor(props) {
    super(props)

    // state definition
    this.state = {
      searchText: '',
      searchResults: [],
      collections: [misterMiracle, manOfSteel],
      isSearch: false,
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
      searchResults: []
    })

    // fetch volume information
    if (this.state.searchText) {
      
      const volumesPromises = searchVolumes(this.state.searchText.replace(' ', '%20'), baseURL, apiKey)
      volumesPromises.then(volumes => {
        let volumeList = volumes.map(volume => {
          return {
            id: volume.id,
            title: volume.name,
            totalIssues: volume.count_of_issues,
            img: volume.image.thumb_url,      
            publishingDate: volume.start_year,
          }
        })

        this.setState({
          searchResults: volumeList
        })
      })
    }
  }

  handleOnClickCollection(collection) {
    this.setState({
      isSearch: false,
      collectionSelected: collection 
    })
  }

  handleOnClickResult(result) {
    let collections = this.state.collections.slice()

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
    console.log(collections)
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
        {this.state.isSearch
          ? <SearchResults 
              results={this.state.searchResults}
              onClickResult={this.handleOnClickResult}
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
