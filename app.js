



async function callWeather(searchTerm) {

    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=${APIKEY}`)
                .then(response => response.json())
                //....for the UV ID.....
    const onecall = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&units=imperial&appid=${APIKEY}`)
                .then(response => response.json())
                console.log(onecall)
//passing weather, onecall so I can pick through two api endpoints
callWeatherHTML(weather, onecall)
    // fetch(
    //     'https://api.openweathermap.org/data/2.5/weather?q=' +
    //     searchTerm +
    //     '&units=imperial&appid=' +
    //     APIKEY 
        
    // )
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         callWeatherHTML(data)
    //         console.log(data)
    //     })

        
}

//create search history I can interact with
function onSearch(event) {
    //prevent refresh so I can submit with enter key
    event.preventDefault()
    //capture value of input so I can choose the city
    let searchTerm = document.querySelector('#searchTerm')
    let searchHistory = document.querySelector('.search-history')

    let p = document.createElement('p')
    p.innerText = searchTerm.value
    p.addEventListener('click', function () {
        searchTerm.value = ''
        callWeather(p.innerText)
    })
    searchHistory.append(p)
    callWeather(searchTerm.value)
    searchTerm.value = ''
    

}


function callWeatherHTML(weather, onecall) {
    let currentCity = document.querySelector('#currentCity')
    let temperature = document.querySelector('#temperature')
    let humidity = document.querySelector('#humidity')
    let windSpeed = document.querySelector('#windSpeed')
    //can select child of element/id/etc
    let uvIndex = document.querySelector('#uvIndex span')
    let currentCityImg = document.querySelector('#isCity img')
    


    // currentCity.innerText = response.name + ' ' + '(' + new Date(Date.now()).toDateString() + ')'
    currentCity.innerText = `${weather.name} (${ new Date(Date.now()).toDateString() })`
    temperature.innerText = `Temperature: ${weather.main.temp}°F`
    humidity.innerText =  `Humidity: ${weather.main.humidity}% `
    windSpeed.innerText = `Wind Speed: ${weather.wind.speed} MPH`
    uvIndex.innerText = `${onecall.current.uvi}`
    currentCityImg.src = `http://openweathermap.org/img/wn/${onecall.current.weather[0].icon}.png`


    
        if (onecall.current.uvi > 6) {
            uvIndex.className = 'highUVI'

            //uvIndex.classList.add('highUVI')
        } else if (onecall.current.uvi < 3) {
            uvIndex.className = 'lowUVI'

        } else {
            uvIndex.className = 'modUVI'
            
        }
    
}


