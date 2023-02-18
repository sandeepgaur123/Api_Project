const inputEl = document.getElementById("input");
console.log(inputEl);
const btnEl = document.getElementById("btn");
console.log(btnEl);
const weatherEl = document.getElementById("weather-info");
console.log(weatherEl)
const HourMinEl = document.getElementById("Hour-Min");
const DayMonthEl = document.getElementById("Day-Month");
const AmPm = document.getElementById("ampm");
console.log(AmPm)


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const Months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
    const Hour = time.getHours();
    const Minutes = time.getMinutes();
    const Seconds = time.getSeconds();
    const Day = time.getDay();
    const date = time.getDate();
    const Month = time.getMonth();
    const Hours12Method = Hour >= 13 ? Hour % 12 : Hour;
    const ampm = Hour >= 12 ? 'PM' : 'AM';
    HourMinEl.innerHTML = (Hours12Method < 10 ? "0" + Hours12Method : Hours12Method) + ":" + (Minutes < 10 ? "0" + Minutes : Minutes) + ":" + (Seconds < 10 ? "0" + Seconds : Seconds) + ampm;
    DayMonthEl.innerHTML = days[Day] + " , " + date + " " + Months[Month];
}, 1000)

const Apikey = "199bf602577557db416995b1a3de476e";

// const options = {
//     method: "GET",
//     headers: {
//         "X-Api-Key": Apikey,
//     },
// };

async function weatherData(city) {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Apikey}&units=metric`;
    const response = await fetch(URL)
    const data = await response.json();
    console.log(data.weather);
    console.log(data.main)
    console.log(data);
    // console.log(data)
    // const {temp,humidity,wind_speed,sunrise,sunset}=data;
    // console.log(temp);
    weatherEl.innerHTML = `
    <div class='weather-dis'>
    <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
    <p>Description:${data.weather[0].description}</p>
    </div>
    <p>Current Temp:${data.main.temp}°C</p>
    <div class='temp-time'>
    <div>
    <p>Max Temp:${data.main.temp_max}°C</p>
    <p>Min Temp:${data.main.temp_min}°C</p>
    <p>Humidity:${data.main.humidity}%</p>
    </div>
    <div>
    <p>Wind Speed:${data.wind.speed}Km/h</p>
    <p>Sunrise : ${window.moment(data.sys.sunrise * 1000).format('HH:mm a')}</p>
    <p>Sunset : ${window.moment(data.sys.sunset * 1000).format('HH:mm a')}</p>
    </div>
    </div>`

    // console.log(data.temp)
    // console.log(data);
}


btnEl.addEventListener('click', (e) => {
    e.preventDefault();
    weatherData(inputEl.value);
    if (inputEl.value) {
        weatherEl.classList.add("weather-info");
    }
    else {
        weatherEl.classList.add("");
    }
})


