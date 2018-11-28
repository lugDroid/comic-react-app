import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    const proxy = 'https://allorigins.me/get?method=raw&url='
    const baseURL = 'http://comicvine.gamespot.com/api'
    const apiKey = '8cd3ed9e59e0d9a58377048e00674d893b7a2450'

    fetch(proxy + baseURL + '/issues/?api_key=' + apiKey, {mode: 'no-cors'})
      .then(response => response.json())
      .then(json => console.log(json))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}



export default App;
