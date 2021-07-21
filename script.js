let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");



searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    getWeathether(searchInput.value);
    searchInput.value = '';
});


const getWeathether = async (city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=21503e848a940e9ae4a20af90c186a99`,
            { mode: 'cors' }


        );


        const weatherData = await response.json();
        console.log(weatherData);
        const { name } = weatherData;
        const { feels_like } = weatherData.main;
        const { id, main } = weatherData.weather[0];
        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent = Math.round(feels_like - 273);
        if (id < 300 && id > 200) {
            tempicon.src = "thunder.svg";
        }
        else if (id < 400 && id > 300) {
            tempicon.src = "cloudy.svg";
        }
        else if (id < 600 && id > 500) {
            tempicon.src = "rainy-1.svg";
        }
        else if (id < 700 && id > 600) {
            tempicon.src = "snowy-1.svg";
        }
        else if (id < 800 && id > 700) {
            tempicon.src = "weathe_sunset.svg";
        }
    }
    catch (error) {
        alert('city not found');
    }

};





window.addEventListener("load", () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/corsdemo";
            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=21503e848a940e9ae4a20af90c186a99;
            `
            fetch(api).then((response) => {
                return response.json();
            })
                .then(data => {
                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0];


                    loc.textContent = name;
                    climate.textContent = main;
                    tempvalue.textContent = Math.round(feels_like - 273);
                    if (id < 300 && id > 200) {
                        tempicon.src = "thunder.svg";
                    }
                    else if (id < 400 && id > 300) {
                        tempicon.src = "cloudy.svg";
                    }
                    else if (id < 600 && id > 500) {
                        tempicon.src = "rainy-1.svg";
                    }
                    else if (id < 700 && id > 600) {
                        tempicon.src = "snowy-1.svg";
                    }
                    else if (id < 800 && id > 700) {
                        tempicon.src = "weathe_sunset.svg";
                    }
                })

        })
    }
})
