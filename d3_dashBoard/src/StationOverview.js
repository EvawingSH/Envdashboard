import React from 'react'
import Temp from './Components/WeatherAndHeat/Temp'
import Humidity from './Components/WeatherAndHeat/Humidity'
import Rain from './Components/WeatherAndHeat/Rain'
import Wind from './Components/WeatherAndHeat/Wind'
import Sun from './Components/WeatherAndHeat/Sun'
import { Col, Row } from 'react-bootstrap'
import { UseApiData } from './Components/Data/UseApiData'
import WeatherComparison from './Components/WeatherAndHeat/WeatherComparison'
import HistoricalChart from './Components/HistoricalData/HistoricalChart'
import { Link } from 'react-router-dom'
import StationDes from './Components/Map/StationDes'
import AQIWrapper from './Components/AQI/AQIWrapper'
import AQIComparison from './Components/AQI/AQIComparison'

const StationOverview = ({ activeSensor }) => {

  const Dates = new Date()
  const ThisMonth = Dates.getUTCMonth()
  const ThisYear = Dates.getUTCFullYear()
  const MonthYear = new Date(ThisYear, ThisMonth, 1)
  const res = UseApiData(activeSensor, MonthYear)
  const Data = res.dataNow
  const dData = res.dData


  if (!Data) {
    return <pre>Loading...</pre>
  } else if (Data === 'The sensor is currently not working.' || dData === 'The sensor is currently not working.') {
    return <div>
      <div id='StationDes' style={{ marginLeft: '20px', fontFamily: 'Tw Cen MT', marginRight: '20px', marginBottom: '20px' }}>
        <StationDes activeSensor={activeSensor} />
      </div>
      <div id='weather and heat' style={{ marginLeft: '20px', fontFamily: 'Tw Cen MT', marginRight: '20px', marginBottom: '20px', borderTop: '2px solid black' }}>
        <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px', fontWeight: 'bold' }}>
          Weather and Heat</h2>
        <p style={{fontSize: 20}}>The sensor is currently not working...</p>
      </div>
      <div id='Air Quality' style={{ fontFamily: 'Tw Cen MT', marginLeft: '20px', marginRight: '20px',marginBottom: '20px', borderTop: '2px solid black' }}>
        <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px', fontWeight: 'bold' }}>
          Air Quality</h2>
        <h3 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px' }}>
          Current Air Quality</h3>
        <AQIWrapper />
        <h3 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '-10px' }}>
          Compared to Yesterday</h3>
        <AQIComparison />
        <h4 style={{ marginTop: 30, marginBottom: 0, color: 'gray' }}>
          * refers to the maximum allowable standard.</h4>
        <h4 style={{ marginTop: 0, marginBottom: -10, color: 'gray' }}>
          Air quality data is retrieved from sensors at Norwest Sales Office.</h4>
      </div>
      <div id='Historical Data' style={{ fontFamily: 'Tw Cen MT', marginLeft: '20px', marginRight:'20px',marginBottom: '30px', borderTop: '2px solid black' }}>
        <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '5px', fontWeight: 'bold' }}>
          Historical Data</h2>
          <HistoricalChart sensor={activeSensor} />
        <Link to="/"><p style={{ fontSize: '24px' }}>Back</p></Link>
      </div>
    </div>
  }else {
  return (
    <div>
      <div id='StationDes' style={{ marginLeft: '20px', fontFamily: 'Tw Cen MT', marginRight: '20px', marginBottom: '20px' }}>
        <StationDes activeSensor={activeSensor} />
      </div>
      <div id='weather and heat' style={{ marginLeft: '20px', fontFamily: 'Tw Cen MT', marginRight: '20px', marginBottom: '20px', borderTop: '2px solid black' }}>
        <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px', fontWeight: 'bold' }}>
          Weather and Heat</h2>
        <h3 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px' }}>
          Current Weather</h3>
        <Row>
          <Col ><Temp Temp={Data.airtemperature} /></Col>
          <Col ><Humidity Humidity={Data.relativehumidity} /></Col>
          <Col><Rain Rain={Data.precipitation} /></Col>
          <Col><Wind Wind={Data.windspeed} /></Col>
          <Col><Sun Solar={Data.solarradiation? Data.solarradiation: Data.solar} /></Col>
        </Row>
        <h3 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '-10px' }}>
          Compared to Yesterday</h3>
        <WeatherComparison DataNow={Data} Data={dData} />
        <div id='Air Quality' style={{ fontFamily: 'Tw Cen MT', marginBottom: '20px', borderTop: '2px solid black' }}>
          <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px', fontWeight: 'bold' }}>
            Air Quality</h2>
          <h3 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px' }}>
            Current Air Quality</h3>
          <AQIWrapper />
          <h3 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '-10px' }}>
            Compared to Yesterday</h3>
          <AQIComparison />
          <h4 style={{ marginTop: 30, marginBottom: 0, color: 'gray' }}>
            * refers to the maximum allowable standard.</h4>
          <h4 style={{ marginTop: 0, marginBottom: -10, color: 'gray' }}>
            Air quality data is retrieved from sensors at Norwest Sales Office.</h4>
        </div>
        <div id='Historical Data' style={{ fontFamily: 'Tw Cen MT', marginBottom: '30px', borderTop: '2px solid black' }}>
          <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '5px', fontWeight: 'bold' }}>
            Historical Data</h2>
          <HistoricalChart sensor={activeSensor} />
          <Link to="/"><p style={{ fontSize: '24px' }}>Back</p></Link>
        </div>
      </div>
    </div>
  )
  }
}
export default StationOverview