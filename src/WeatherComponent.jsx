import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import './assets/WeatherComponent.css'

const WeatherComponent = () => {
    const API_KEY = 'b1778c27b1154a8e84332843232510'
    const [cityName, setCityName] = useState('')
    const [weatherData, setWeatherData] = useState({})
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`)
            .then(response => console.log(response.data))
    }, [latitude, longitude])

    const cityNameHandler = (event) => {
        setCityName(event.target.value)
    }

    const getWeather = () => {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`)
            .then(response => setWeatherData(response.data))
    }

    return (
        <div className="weather-container">
            <input type='text' value={cityName} onChange={cityNameHandler} placeholder="Enter city name" />
            <button onClick={getWeather}>Get Weather</button>
            {weatherData.current && (
                <>
                    <h1>{weatherData.current.temp_c}&deg;C</h1>
                    <p>{weatherData.location.name}, {weatherData.location.region}</p>
                    <p>{weatherData.current.condition.text}</p>
                </>
            )}
        </div>
    )
}

export default WeatherComponent
