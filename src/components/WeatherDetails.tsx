import './WeatherDetails.css'

interface WeatherDetailsProps {
  cloudy: number,
  humidity: number,
  wind: number,
  rain: number,
}

export function WeatherDetails(props: WeatherDetailsProps) {
  return (
    <div className="weather-details">
      <h3>Detalhes do Tempo</h3>

      <div className="detail">
        <p>Nublado</p>
        <span>{props.cloudy} %</span>
      </div>
      <div className="detail">
        <p>Humidade</p>
        <span>{props.humidity} %</span>
      </div>
      <div className="detail">
        <p>Vento</p>
        <span>{props.wind} km/h</span>
      </div>
      <div className="detail">
        <p>Chuva</p>
        <span>{props.rain} mm</span>
      </div>
    </div>
  )
}