const fetch = require('node-fetch')

// search volumes given a search text
// will return a promise that eventually will be an array with the results
async function searchVolume(volume, url, apiKey) {
  url = url + '/volumes/?api_key='
  url = url + apiKey
  url = url + '&format=json&filter=name:' + volume

  let results = await fetch(url, {mode: 'no-cors'})
                  .then(response => response.json())
                  .then(json => json.results)

  return results
}

// search for issues given a volume id
async function searchIssues(volumeID, url, apiKey) {
  url = url + '/issues/?api_key='
  url = url + apiKey  
  url = url + '&format=json&filter=volume:' + volumeID
  
  let results = await fetch(url, {mode: 'no-cors'})
                  .then(res => res.json())
                  .then(json => json.results)

  return results
}

// ### MAIN ###

//const proxy = 'https://allorigins.me/get?method=raw&url='
const apiKey = '8cd3ed9e59e0d9a58377048e00674d893b7a2450'
let baseURL = 'http://comicvine.gamespot.com/api'

// TO-DO: this value should come from an input box
let searchText = 'mister%20miracle'

/* // construct base api url
baseURL = baseURL + '/volumes/?api_key='
baseURL = baseURL + apiKey */

let volumesPromises = searchVolume(searchText, baseURL, apiKey)

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

      let issuesPromises = searchIssues(volumes[data - 1].id, baseURL, apiKey)

      issuesPromises.then(issues => {
        for (let issue of issues) {
          console.log(issue.issue_number + ' - ' + issue.name + ' (' + issue.cover_date + ')')
        }
      })
    } else {
      process.exit()
    }
  })
})

