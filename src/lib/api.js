const fetch = require('node-fetch')

async function getVolumes(volume, baseUrl, apiKey, offset) {
  let url = baseUrl + '/volumes/' 
  url += '?api_key=' + apiKey
  url += '&filter=name:' + volume 
  url += '&format=json&sort=name:asc&offset=' + offset

  console.log('Fetching info for volumes containing ' + volume)
  console.log(url)

  let volumesResult = await fetch(url)
    .then(res => res.json())
    .then(json => {
      // if no more results to fetch return empty array
      if (json.offset + json.number_of_page_results > json.number_of_total_results) {
        console.log('Recursion finished')
        return []
      }

      // else calculate next offset
      let offset= json.offset + json.number_of_page_results + 1
      
      return json.results.concat(getVolumes(volume, baseUrl, apiKey, offset)
        .then(results => results)
      )
    })
    .catch(error => console.log('Error reading data ' + error))

  return volumesResult
}

// search volumes given a search text
// will return a promise that eventually will be an array with the results
async function searchVolumes(volume, baseUrl, apiKey, offset) {

  let resultsPromises = []

  resultsPromises.push(getVolumes(volume, baseUrl, apiKey, offset))
  
  let finalResult = []
  return Promise.all(resultsPromises)
    .then(results => {
      results.forEach(result => {
        finalResult = finalResult.concat(result)
      })
      console.log(finalResult)
      return finalResult
    })
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