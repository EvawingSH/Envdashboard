import React from 'react'
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import { useState } from 'react'
import ParameterBar from './ParameterBar'
import { iconGenerator, windIconGenerator } from './iconGenerator'
import ColorScale from './ColorScale'
import { UseApiDataforMap } from '../Data/UseApiDataforMap'
import { timeFormat, format, } from 'd3'
import { Link } from 'react-router-dom'
import LocationDropdown from './LocationDropdown'


const MapWrapper = (props) => {

    const [activePara, setActivePara] = useState("Temp")
    const Data = UseApiDataforMap()
    
    const Parachoice = () => {
        if (activePara === 'Temp') {
            return ['airtemperature', 'Temp', '°C', 'TemptoMedian']
        } else if (activePara === 'Humidity') {
            return ['relativehumidity', 'Humidity', '%', 'HumtoMedian']
        } else if (activePara === 'Rain') {
            return ['precipitation', 'Rain', 'mm', 'precipitation']
        } else if (activePara === 'Wind') {
            return ['windspeed', 'Wind', 'Km/h', 'windspeed']
        } else if (activePara === 'Solar') {
            return ['solarradiation', 'Solar', 'W/m²', 'solarradiation']
        }
    }

    if (!Data) {
        return <pre>Loading</pre>
    }

    return (
        <div style={{ marginRight: 20, borderTop: '2px solid black', fontSize: '22px' }}>
            <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '10px', fontWeight: 'bold' }}>
                See How Your Location Compares</h2>
            <p style={{ color: '#4d4d4d' }}>You can check different current environmental measurements using the navigation bar. And you can check both current and historical data for a specific weather station by choosing a location from the list or clicking a sensor on the map.</p>
            <LocationDropdown onSensorChange={(e) => props.onClickSensor(e)} />
            <ParameterBar onClick={(value) => setActivePara(value)} />
            <ColorScale para={activePara} />
            <MapContainer center={[-33.73789, 150.95503]} zoom={14} scrollWheelZoom={false} style={{ marginTop: 10, height: 380, width: '100%' }} zoomControl={false}>
                <TileLayer
                    attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
                    url="https://api.mapbox.com/styles/v1/liusijiesh/ckw21mew75rl515pie4fuxvs4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibGl1c2lqaWVzaCIsImEiOiJja3M0MnNqY24wNWFmMnZwdGFyZHpyaGI0In0.ixbWzEpnRUcvU6PFYD7MsA"
                />

                <ZoomControl position="bottomright" />
                {Data.map(
                    sensor => (
                        !sensor.data[Parachoice()[0]] ? null :
                            <Marker key={sensor.name} position={[
                                sensor.Lat,
                                sensor.Lon]}
                                icon={activePara === 'Wind' ? windIconGenerator(sensor.data.windspeed, sensor.data.winddirection) : iconGenerator(sensor.data[Parachoice()[3]], Parachoice()[1])}
                                eventHandlers={{ click: (e) => props.onClickSensor(sensor.name) }}

                            >
                                <Popup>
                                    <div>
                                        
                                        <p>{timeFormat('%c')(new Date(sensor.data.time))}</p>
                                        <p style={{fontSize: 16, marginTop:-15}}>{sensor.Location}</p>
                                        <h2>{format('.1f')(sensor.data[Parachoice()[0]])}{Parachoice()[2]}</h2>
                                        <Link to={`/WeatherHeat/${sensor.name}`}>View more</Link>
                                    </div>
                                </Popup>

                            </Marker>

                    ))}
                )
            </MapContainer>

        </div>
    )
}

export default MapWrapper