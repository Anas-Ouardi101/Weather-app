import './weatherApp.css'
import { useState } from 'react'

import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import rain_icon from "../assets/rain.png"
import search_icon from "../assets/search.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"
import sunrise_icon from '../assets/sunrise.png'
import sunset_icon from '../assets/sunset.png'

const WeatherApp = () =>{

    const [temp,setTemp] = useState();
    const [location,setLocation] = useState();
    const [humidity,setHumidity] = useState();
    const [wind,setWind] = useState();
    const [wenicon,setWenicon] = useState(cloud_icon);
    const [erre,setErre] = useState();
    const [sunrise,setSunrise] = useState();
    const [sunset,setSunset] = useState();

    let api_key = import.meta.env.VITE_api_key;
    const search = async () =>{
        const element = document.getElementById('cityInput');
        if(element.value === ""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units-Metric&appid=${api_key}`
        
        let response = await fetch(url);
        let data = await response.json();
        
        if(data.cod == 404){
            setErre(data.message);
            return 0;
        }else{
            // console.log(data);
            const  sunriseDate = new Date(data.sys.sunrise * 1000);
            const  sunsetDate = new Date(data.sys.sunset * 1000);
            setSunrise(sunriseDate.getUTCHours()+":"+sunriseDate.getUTCMinutes());
            setSunset(sunsetDate.getUTCHours()+":"+sunsetDate.getUTCMinutes());
            setHumidity(data.main.humidity);
            setLocation(data.name);
            const x = Math.round((data.main.temp -273.15) * 100) / 100;
            // console.log(x);
            setTemp(x);
            setWind(data.wind.speed);
            setErre();

            // console.log(data.weather[0].icon);
            if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
                setWenicon(clear_icon);
            }else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
                setWenicon(cloud_icon);
            }
            else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
                setWenicon(drizzle_icon);
            }
            else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
                setWenicon(drizzle_icon);
            }
            else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
                setWenicon(rain_icon);
            }
            else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
                setWenicon(rain_icon);
            }
            else if(data.weather[0].icon==="11d" || data.weather[0].icon==="11n"){
                setWenicon(rain_icon);
            }
            else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
                setWenicon(snow_icon);
            }
            else if(data.weather[0].icon==="50d" || data.weather[0].icon==="50n"){
                setWenicon(cloud_icon);
            }
            
        }
        

        
    };
    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" id="cityInput" placeholder="Search | city name"/>
                <div className="search-icon" onClick={()=>search()}>
                    <img src={search_icon} alt="search icon" />
                </div>
            </div>
            <div className="erre">
                {erre}
            </div>
            <div className="weather-image" >
                <img src={wenicon} alt="Cloud icon" />
            </div>
            <div className="weather-temp">{temp}°C</div>
            <div className="weather-location">{location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">
                            {humidity} %
                        </div>
                        <div className="text">
                            Humidity
                        </div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-percent">
                            {wind} km/h
                        </div>
                        <div className="text">
                            Wind Speed
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={sunrise_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">
                            {sunrise} AM
                        </div>
                        <div className="text">
                            sunrise
                        </div>
                    </div>
                </div>
                <div className="element" >
                    <img src={sunset_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-percent">
                            {sunset} PM
                        </div>
                        <div className="text">
                             sunset 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default WeatherApp;