import React, { useState } from 'react'
import axios from 'axios'
import '../styles/weather.css'

interface Iweather {
  weather: {
    coord: {
      lon: number
      lat: number
    }
    main: {
      pressure: number
      temp: number
      feels_like: number
      humidity: number
    }
    name: string
    sys: {
      country: string
    }
    weather: {
      0: { main: string; description: string; icon: string }
    }
    wind: {
      speed: number
    }
  }
}

const Weather: React.FC = () => {
  const [city, setCity] = useState<string>('')
  const [time, setTime] = useState<any>('')
  const [weather, setWeather] = useState<Iweather['weather']>()
  const APIKEY = process.env.REACT_APP_APIKEY

  const getData = async (e: any) => {
    e.preventDefault()
    setCity('')
    try {
      if (city !== '') {
        const weatherData: any = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKEY}`
        )
        setWeather(weatherData.data)
        setTime(new Date(weatherData.data.dt * 1000).toDateString())
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
  return (
    <div className='weather'>
      <form onSubmit={getData}>
        <input
          value={city}
          placeholder=' Enter city name...'
          type='text'
          onChange={(e) => {
            setCity(e.target.value)
          }}
        />
        <button type='submit'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='36px'
            viewBox='0 0 24 24'
            width='36px'
            fill='#000000'
          >
            <path d='M0 0h24v24H0z' fill='none' />
            <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
          </svg>
          <p>search</p>
        </button>
      </form>
      <div>
        {weather && (
          <div className='city'>
            <h1>
              Current weather in {weather?.name} {weather?.sys.country}
            </h1>
            <img
              src={`http://openweathermap.org/img/w/${weather?.weather[0].icon}.png`}
              alt='weatherIcon'
            />
            <h2>{time}</h2>
            <h2>{weather?.weather[0].description}</h2>
          </div>
        )}
        {weather && (
          <div className='stats'>
            <h2>{' Temperature: ' + weather?.main.temp}°C</h2>
            <h2>{' Feels like: ' + weather?.main.feels_like}°C</h2>
            <h2> {' Pressure: ' + weather?.main.pressure} mb</h2>
            <h2> {' Humidity: ' + weather?.main.humidity}%</h2>
            <h2> {' Wind: ' + weather?.wind.speed} m/s</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default Weather
