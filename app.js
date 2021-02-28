function callWeather() {
    //capture value of input so I can choose the city
    let searchTerm = document.querySelector('#searchTerm').value 

    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=' +
        searchTerm + 
        '&appid={APIKEY}'
    )
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data)
    })
}