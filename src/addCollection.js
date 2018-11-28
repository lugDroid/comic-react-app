const fetch = require('node-fetch')

const proxy = 'https://allorigins.me/get?method=raw&url='
const apiKey = '8cd3ed9e59e0d9a58377048e00674d893b7a2450'
let baseURL = 'http://comicvine.gamespot.com/api'

// TO-DO: this value should come from an input box
let searchText = 'mister%20miracle'

// construct base api url
baseURL = baseURL + '/volumes/?api_key='
baseURL = baseURL + apiKey

// search volumes given a search text
// will return a promise that eventually will be an array with the results
async function searchVolume(volume, url) {
  url = url + '&format=json&filter=name:' + volume

  let results = await fetch(url, {mode: 'no-cors'})
  .then(response => response.json())
  .then(json => json.results)

  return results
}

// search for issues given a volume id
function searchIssues(volumeID, url) {
  url = url + '&format=json&filter=volume:' + volumeID
  fetch(url, {mode: 'no-cors'})
  .then(res => res.json())
  .then(json => console.log(json))
}

// ### MAIN ###
let volumesPromises = searchVolume(searchText, baseURL)

volumesPromises.then(volumes => {
  volumes.forEach((volume, index) => {
    console.log((index + 1) + ' ' + volume.start_year + ' - ' + volume.name + ' ' + volume.deck)
  })

  // the user will select one of the returned volumes
  let stdInput = process.stdin
    stdInput.setEncoding('utf-8')

    console.log('Please select one option\n')

    stdInput.on('data', (data) => {
      if (data > 0 && data < volumes.length + 1) {
        console.log(volumes[data - 1].count_of_issues)
      } else {
        process.exit()
      }
    })
})

