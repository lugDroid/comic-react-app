const fetch = require('node-fetch')

const proxy = 'https://allorigins.me/get?method=raw&url='
const baseURL = 'http://comicvine.gamespot.com/api'
const apiKey = '8cd3ed9e59e0d9a58377048e00674d893b7a2450'

fetch(baseURL + '/volumes/?api_key=' + apiKey + '&format=json&filter=name:mister%20miracle', {mode: 'no-cors'})
  .then(response => response.json())
  .then(json => {
    json.results.forEach(element => {
      console.log(element.start_year + ' - ' + element.name)
    })
    const volumeName = json.results[7].name.replace(' ', '%20')
    console.log(volumeName)
    fetch(baseURL + '/issues/?api_key=' + apiKey + '&format=json&filter=volume:' + volumeName)
      .then(res => res.json())
      .then(json => console.log(json))
  })