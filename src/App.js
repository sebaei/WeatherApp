import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.css";

function App() {
  const [celsius, setCelsius] = useState(false);
  const [fahrenheit, setFahrenheit] = useState(true);
  const [maxtemp, setMaxtemp] = useState(null);
  const [weather, setWeather] = useState("");
  const [hourly, setHourly] = useState(false);
  const [daily, setDaily] = useState(true);

  const switchtoC = () => {
    setFahrenheit(false);
    setCelsius(true);
  };
  const switchtoF = () => {
    setCelsius(false);
    setFahrenheit(true);
  };

  const showhourly = () => {
    setDaily(false);
    setHourly(true);
  };
  const showdaily = () => {
    setHourly(false);
    setDaily(true);
  };

  function HourlyList(props) {
    const hlistItems = props.weather.hourly.data.map(function (item) {
      return <li key={item["time"]}>{Math.round(item["temperature"])}°</li>;
    });
    let hlistslice = hlistItems.slice(1, 25);
    return <ul>{hlistslice}</ul>;
  }

  function DailyList(props) {
    const dlistItems = props.weather.daily.data.map(function (item) {
      return <li key={item["time"]}>{Math.round(item["temperatureMax"])}°</li>;
    });
    return <ul>{dlistItems}</ul>;
  }

  //Getting Geolocation of User
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      var lat = position.coords.latitude;
      console.log("Longitude is :", position.coords.longitude);
      var lon = position.coords.longitude;
    });
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

  useEffect(() => {
    const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/a177f8481c31fa96c3f95ad4f4f84610/${lat},${lon}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setWeather(json);
        console.log(json);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
    getLocation();
  }, []);

  return (
    <div className="app">
      <main>
        <div className="header">
          <h2>INSTAWEATHER</h2>
          <div className="btn-container">
            <button className="btntemp" onClick={() => switchtoC()}>
              C
            </button>
            <button className="btntemp" onClick={() => switchtoF()}>
              F
            </button>
          </div>
        </div>

        {weather ? (
          <div>
            <div className="loc-weather">
              <div className="location-box">
                <div className="location">{weather.timezone}</div>
                <div className="date">{dateBuilder(new Date())}</div>
                {/* Get Icon */}
                <div className="weather">{weather.currently.summary}</div>
              </div>
              <div className="weather-box">
                <div className="temp">
                  {fahrenheit ? (
                    <div> {Math.round(weather.currently.temperature)}° </div>
                  ) : (
                    <div>
                      {Math.round(
                        (Math.round(weather.currently.temperature - 32) * 5) / 9
                      )}
                      °
                    </div>
                  )}
                </div>
                <div className="maxmin">
                  {fahrenheit ? (
                    <div>
                      {Math.round(weather.daily.data[0].temperatureMax)}° /
                      {Math.round(weather.daily.data[0].temperatureMin)}°{" "}
                    </div>
                  ) : (
                    <div>
                      {Math.round(
                        (Math.round(weather.daily.data[0].temperatureMax - 32) *
                          5) /
                          9
                      )}
                      ° /
                      {Math.round(
                        (Math.round(weather.daily.data[0].temperatureMin - 32) *
                          5) /
                          9
                      )}
                      °{" "}
                    </div>
                  )}
                </div>
                <div className="summary"> {weather.daily.data[0].summary}</div>
              </div>
            </div>
            <div className="intervals">
              <button className="interval-btn" onClick={() => showhourly()}>
                Hourly
              </button>
              <button className="interval-btn" onClick={() => showdaily()}>
                Daily
              </button>
              <div className="slider">
                {hourly && <HourlyList weather={weather} />}
                {daily && <DailyList weather={weather} />}
              </div>
            </div>
          </div>
        ) : (
          "Weather"
        )}
      </main>
    </div>
  );
}

export default App;
