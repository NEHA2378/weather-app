
let form = document.querySelector("form")
let response = document.querySelector("#response")
response.style.display = "none"

form.addEventListener("submit", async (event) => {
    let cityName = event.target.searchInput.value
    // console.log(cityName)

    event.preventDefault()

    let fetchData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`)

    let finalRes = await fetchData.json()
    response.style.display = "block"
    // console.log(finalRes)
    if (finalRes.cod == "404" || finalRes.cod == "400") {
        response.innerHTML = 'City Not Found'
    }
    else {
        let { name, weather, main, wind } = finalRes

        response.innerHTML = `
        <h2 class="city-name">${cityName}</h2>
            
            <div class="weather-main">
                <div class="weather-icon"><img src = "https://openweathermap.org/img/w/${weather[0].icon}.png"></div>
                <div class="temperature">${main.temp}°C</div>
            </div>

            <p class="description">${weather[0].description}</p>

            <div class="details">
                <div class="detail-item">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${main.humidity}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Wind Speed</div>
                    <div class="detail-value">${wind.speed} km/h</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Pressure</div>
                    <div class="detail-value">${main.pressure}mb</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Feels Like</div>
                    <div class="detail-value">${main.feels_like}°C</div>
                </div>
            </div>`
    }
})
