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
    const location = race.Circuit.Location
    const raceDate = new Date(`${race.date}T${race.time}`)

    const formattedDate = raceDate.toLocaleDateString(undefined, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })

    const formattedTime = raceDate.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    })

    document.querySelector('#app').innerHTML = `
      <header>
        <p>Race Control</p>
        <h1>PitWall</h1>
      </header>

      <main>
        <section class="race-card">
          <p>Next Race</p>
          <h2>${race.raceName}</h2>

          <p class="countdown-label">Lights out in</p>

          <div class="countdown" id="countdown">
            <div>
              <span id="days">00</span>
              <small>Days</small>
            </div>

            <div>
              <span id="hours">00</span>
              <small>Hours</small>
            </div>

            <div>
              <span id="minutes">00</span>
              <small>Minutes</small>
            </div>

            <div>
              <span id="seconds">00</span>
              <small>Seconds</small>
            </div>
          </div>

          <p><strong>Circuit:</strong> ${race.Circuit.circuitName}</p>
          <p><strong>Location:</strong> ${location.locality}, ${location.country}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${formattedTime}</p>
        </section>
      </main>
    `

    function updateCountdown() {
      const difference = raceDate.getTime() - Date.now()

      if (difference <= 0) {
        document.querySelector('#countdown').innerHTML = '<p>Lights out!</p>'
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      )
      const seconds = Math.floor(
        (difference % (1000 * 60)) / 1000
      )

      document.querySelector('#days').textContent =
        String(days).padStart(2, '0')

      document.querySelector('#hours').textContent =
        String(hours).padStart(2, '0')

      document.querySelector('#minutes').textContent =
        String(minutes).padStart(2, '0')

      document.querySelector('#seconds').textContent =
        String(seconds).padStart(2, '0')
    }

    updateCountdown()
    setInterval(updateCountdown, 1000)
  })
  .catch(error => {
    document.querySelector('#app').innerHTML = `
      <h1>PitWall</h1>
      <p>Unable to load race data.</p>
    `

    console.log(error)
  })


  