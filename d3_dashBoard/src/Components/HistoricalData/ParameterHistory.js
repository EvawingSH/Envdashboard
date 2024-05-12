import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Sensorinfo from '../Data/Sensorinfo.json'
import {count} from 'd3'


const ParameterHistory = (props) => {
    
    const Sensor=Sensorinfo.features.filter((d)=>{
        return d.name===props.activeSensor})

    const WeatherPara = [
        { name: 'Temperature', value: 'Temp', OnOff: !count(Sensor, d => d.Temp) ? 0 : 1 },
        { name: 'Humidity', value: 'Humidity', OnOff: !count(Sensor, d => d.Humidity) ? 0 : 1 },
        { name: 'Rain', value: 'Rain', OnOff: !count(Sensor, d => d.Rain) ? 0 : 1 },
        { name: 'Wind', value: 'Wind', OnOff: !count(Sensor, d => d.Wind) ? 0 : 1 },
        { name: 'Solar', value: 'Solar', OnOff: !count(Sensor, d => d.Solar) ? 0 : 1 },
    ]
    
    const AQIPara = [
        { name: 'PM2.5', value: 'PM2.5', OnOff: 1 },
        { name: 'PM10', value: 'PM10', OnOff: 1 },
        { name: 'O₃', value: 'O₃', OnOff: 1 },
        { name: 'NO₂', value: 'NO₂', OnOff: 1 },
        { name: 'CO', value: 'CO', OnOff: 1 },
    ]

    return (
        <div>
            <div>
            <svg width='140' height='50'>
                <text y='40' style={{ fontSize: 24 }}>Weather</text>
            </svg>

            <ButtonGroup size='lg' style={{ marginTop: 20, fontFamily: 'TW Cen MT' }} className='mb-2' type='checkbox'>
                {WeatherPara.map((para, idx) => (
                    <Button
                        key={idx}
                        id={`radio-${idx}`}
                        variant='outline-dark'
                        name="radio"
                        value={para.value}
                        style={{ borderWidth: 2 }}
                        disabled= {para.OnOff === 1? false : true}
                        onClick={(e) => props.onClick(e.currentTarget.value)}
                    >
                        {para.name}
                    </Button>
                ))}
            </ButtonGroup>
            </div>
            <svg width='140' height='70'>
                <text y='40' style={{ fontSize: 24 }}>Air Quality</text>
            </svg>
            <ButtonGroup 
            size='lg' 
            style={{ marginTop:0, fontFamily: 'TW Cen MT' }} 
            className='mb-2' 
            type='checkbox'
            >
                {AQIPara.map((para, idx) => (
                    <Button
                        key={idx}
                        id={`radio-${idx}`}
                        variant='outline-dark'
                        name="radio"
                        value={para.value}
                        style={{ borderWidth: 2 }}
                        onClick={(e) => props.onClick(e.currentTarget.value)}
                        disabled= {para.OnOff === 1? '':'true'}
                    >
                        {para.name}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    )

}

export default ParameterHistory