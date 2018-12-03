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