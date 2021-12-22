import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

// const api = {
//   key: "1219efb5466d6672691e5aeb111c77e3",
//   base: "https://api.openweathermap.org/data/2.5/",

function App() {
  const [celsius, setCelsius] = useState(true);
  const [fahrenheit, setFahrenheit] = useState(false);
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherIns, setWeatherIns] = useState("");

  const switchtoC = () => {
    setFahrenheit(false);
    setCelsius(true);
  };
  const switchtoF = () => {
    setCelsius(false);
    setFahrenheit(true);
  };
  //Getting Geolocation of User
  const componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  };
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=30.0719&lon=31.4774&units=metric&appid=1219efb5466d6672691e5aeb111c77e3`

        //"https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610/30.0074,31.4913" Error CORS
      )
        .then((res) => res.json())
        .then((result) => {
          //setWeather(result);
          setQuery("");
          //console.log(result);
        });
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const getWeather = async () => {
    const fetchData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=30.0719&lon=31.477&units=metric&appid=1219efb5466d6672691e5aeb111c77e3`
    );
    const responseweather = await fetchData.json();
    setWeather(responseweather);
    console.log(responseweather);
  };
  const getWeatherInstances = async () => {
    const fetchData = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=30.0719&lon=31.4774&units=metric&appid=1219efb5466d6672691e5aeb111c77e3`
    );
    const responseinst = await fetchData.json();
    setWeatherIns(responseinst);
    console.log(responseinst);
  };

  useEffect(() => {
    getWeather();
    getWeatherInstances();
    //componentDidMount();
  }, []);

  return (
    <div className="app">
      <main>
        <header className="header">
          <h2>INSTAWEATHER</h2>
          <button className="switch-btn" onClick={() => switchtoC()}>
            C
          </button>
          <button className="switch-btn" onClick={() => switchtoF()}>
            F
          </button>
        </header>
        <div>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°</div>
              <div className="maxmin">
                {Math.round(weather.main.temp_max)}°/
                {Math.round(weather.main.temp_min)}°
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
