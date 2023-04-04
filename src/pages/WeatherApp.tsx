import { useEffect, useState } from 'react'

import axios from 'axios'
import './WeatherApp.css'

import { WeatherInfo } from '../components/WeatherInfo'
import { SearchBar } from '../components/SearchBar'
import { WeatherDetails } from '../components/WeatherDetails'

import Sun from '../assets/ceu-limpo.jpg'
import Cloudy from '../assets/ceu-nublado.jpg'
import Rain from '../assets/chuva.jpg'
import Snow from '../assets/neve.jpg'
import Sleet from '../assets/granizo.jpg'
import Thunder from '../assets/trovao.jpg'
import Default from '../assets/default.jpg'

const baseURL = 'https://api.weatherapi.com/v1/forecast.json?'
const apiKey = 'ecefe37e943f4eb4b7a181451230404'

interface WeatherInfoProps {
  degrees: number,
  city: string,
  localtime: string,
  condition: string,
  condition_icon: string,
  cloud: number,
  humidity: number,
  wind: number,
  rain: number
}

export function WeatherApp() {
  const [city, setCity] = useState("")
  const [historic, setHistoric] = useState([])
  const [background, setBackground] = useState(Sun)
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfoProps>({
    degrees: 31,
    city: 'Belém',
    localtime: '2023-04-04 15:19',
    condition: 'Partly cloudy',
    condition_icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
    cloud: 50,
    humidity: 66,
    wind: 9.0,
    rain: 1.3
  })

  const AppStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }

  async function getWeather(city: string) {
    try {
      const response = await axios.get(`${baseURL}key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no&lang=pt`)
      return response.data
    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    async function fetchData() {
      const data = await getWeather("Brasília")

      setWeatherInfo({
        degrees: data.current.temp_c,
        city: data.location.name,
        localtime: data.location.localtime,
        condition: data.current.condition.text,
        condition_icon: data.current.condition.icon,
        cloud: data.current.cloud,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
        rain: data.current.precip_mm
      })
    }

    fetchData();
  }, [])

  
  useEffect(() => {
    const WIC = weatherInfo.condition.toLowerCase()

    if (WIC.includes("sol") || WIC.includes("limpo")) {
      setBackground(Sun) // ceu limpo
    } else if (WIC.includes("nublado") || WIC.includes("neblina" || WIC.includes("nevoeiro"))) {
      setBackground(Cloudy) // ceu nublado
    } else if (WIC.includes("chuva") || WIC.includes("chuvisco") || WIC.includes("aguaceiros")) {
      setBackground(Rain) // chuva 
    } else if (WIC.includes("neve") || WIC.includes("nevasca")) {
      setBackground(Snow) // neve
    } else if (WIC.includes("granizo")) {
      setBackground(Sleet) // granizo
    } else if (WIC.includes("trovoada")) {
      setBackground(Thunder) // trovão
    } else {
      setBackground(Default)
    }

  }, [weatherInfo])

  return (
    <div style={AppStyle} className="App-Container">
      <div className="weather-content">
        <WeatherInfo
          degrees={weatherInfo.degrees}
          city={weatherInfo.city}
          localtime={weatherInfo.localtime}
          condition={weatherInfo.condition}
          condition_icon={weatherInfo.condition_icon}
        />
      </div>

      <aside className="weather-aside">
        <SearchBar
          city={city}
          setCity={setCity}
          setWeatherInfo={setWeatherInfo}
          getWeather={getWeather}
          historic={historic}
          setHistoric={setHistoric}
        />

        <WeatherDetails
          cloudy={weatherInfo.degrees}
          humidity={weatherInfo.humidity}
          wind={weatherInfo.wind}
          rain={weatherInfo.rain}

        />
      </aside>
    </div>
  )
}