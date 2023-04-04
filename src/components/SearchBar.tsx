import { FormEvent } from 'react'
import { MagnifyingGlass } from 'phosphor-react'

import './SearchBar.css'
import axios from 'axios'

interface SearchBarProps {
  city: string,
  setCity: any,
  setWeatherInfo: any,
  getWeather: any,
  historic: any,
  setHistoric: any
}


export function SearchBar(props: SearchBarProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    searchCity(props.city)

    if (props.historic.length < 4) {
      props.setHistoric([props.city, ...props.historic])
    } else {
      const updatedArray = props.historic.slice(0, -1)
      props.setHistoric([props.city, ...updatedArray])
    }
  }

  async function searchCity(city: string) {
    const data = await props.getWeather(city)
    props.setWeatherInfo({
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
    props.setCity("")
  }

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Cidade..."
          type="text"
          value={props.city}
          onChange={(event) => props.setCity(event.target.value)}
        />
        <button type="submit">
          <MagnifyingGlass size={22} />
        </button>
      </form>

      <ul>
        {
          props.historic.map((location: string, index: number) => (
            <li key={index} onClick={() => searchCity(location)} >{location}</li>
          ))
        }
      </ul>
    </div>
  )
}