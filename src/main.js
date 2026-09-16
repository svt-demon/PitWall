import './style.css'

const API_URL = 'https://api.jolpi.ca/ergast/f1/current/next.json'

document.querySelector('#app').innerHTML = `
  <h1>PitWall</h1>
  <p>Loading race data...</p>
`

fetch(API_URL)
  .then(response => response.json())
  .then(data => {
    const race = data.MRData.RaceTable.Races[0]

    document.querySelector('#app').innerHTML = `
      <h1>PitWall</h1>
      <p>Next Race</p>
      <h2>${race.raceName}</h2>
    `
  })
  .catch(error => {
    document.querySelector('#app').innerHTML = `
      <h1>PitWall</h1>
      <p>Unable to load race data.</p>
    `

    console.log(error)
  })