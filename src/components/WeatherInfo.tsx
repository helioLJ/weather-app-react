import './WeatherInfo.css'

interface WeatherInfoProps {
  degrees: number,
  city: string,
  localtime: string,
  condition: string,
  condition_icon: string
}

export function WeatherInfo(props: WeatherInfoProps) {
  const date = new Date(props.localtime);
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();

  return (
    <div className="weather-info">
      <h1>{props.degrees.toString().padStart(2, '0')}<span>°c</span></h1>
      <div className="city-info">
        <h2>{props.city}</h2>
        <span>{`${formattedDate} - ${formattedTime}`}
        </span>
      </div>
      <div className="weather-status">
        <img src={props.condition_icon} alt={props.condition} />
        <span>{props.condition}</span>
      </div>
    </div>
  )
}