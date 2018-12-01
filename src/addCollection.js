const fetch = require('node-fetch')

// search volumes given a search text
// will return a promise that eventually will be an array with the results
async function searchVolumes(volume, url, apiKey) {
  url += '/volumes/' 
  url += '?api_key=' + apiKey
  url += '&filter=name:' + volume 
  url += '&format=json'

  console.log('Fetching info for volumes containing ' + volume)
  console.log(url)
  let volumesResult = await fetch(url)
    .then(res => res.json())
    .then(json => json.results)
    .catch(error => console.log('Error reading data ' + error))

  return volumesResult
}

// search for issues given a volume id
async function searchIssues(volumeID, url, apiKey) {
  url = url + '/issues/?api_key='
  url = url + apiKey  
  url = url + '&format=json&filter=volume:' + volumeID
  
  let issuesResult = await fetch(url)
    .then(res => res.json())
    .then(json => json.results)
    .catch(error => console.log('Error reading data from comic vine ' + error))

  return issuesResult
}

export {searchVolumes, searchIssues}
/* 
// ### MAIN ###

// load api key file
const apiKey =

//const proxy = 'https://allorigins.me/get?method=raw&url='
let baseURL = 'http://comicvine.gamespot.com/api'

// TO-DO: this value should come from an input box
let searchText = 'mister%20miracle'

let volumesPromises = searchVolumes(searchText, baseURL, apiKey)

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

 */