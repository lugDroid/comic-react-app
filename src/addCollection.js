const fetch = require('node-fetch')

const proxy = 'https://allorigins.me/get?method=raw&url='
const baseURL = 'http://comicvine.gamespot.com/api'
const apiKey = '8cd3ed9e59e0d9a58377048e00674d893b7a2450'

// TO-DO: this value should come from an input box
let searchText = 'mister%20miracle'

// search volumes
fetch(baseURL + '/volumes/?api_key=' + apiKey + '&format=json&filter=name:' + searchText,
{mode: 'no-cors'})
  .then(response => response.json())
  .then(json => {
    json.results.forEach(volume => {
      console.log(volume.start_year + ' - ' + volume.name + ' ' + volume.deck)
    })
    // TO-DO: at this point the user will have to select one of the returned volumes

    // get selected volume id
    const volumeID = json.results[7].id

    // get all issues for a selected volume
    fetch(baseURL + '/issues/?api_key=' + apiKey + '&format=json&filter=volume:' + volumeID)
      .then(res => res.json())
      .then(json => console.log(json))
  })