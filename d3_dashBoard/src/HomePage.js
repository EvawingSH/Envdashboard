import React from 'react'
import { useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import MapWrapper from './Components/Map/MapWrapper'
import OverviewWrapper from './Components/Overview/OverviewWrapper'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import IndexDetails from './IndexDetails'
import StationOverview from './StationOverview'
import CityFutures from './Components/images/Org/CityFutures.png'
import UNSW from './Components/images/Org/UNSW.png'


const HomePage = () => {

  const [activeSensor, setActiveSensor] = useState('snla1kb02')
  

  if (!activeSensor) {
    return <pre>Loading...</pre>
  }

  return (
    <Container style={{ maxWidth: '1024px' }}>

      <Row id='Header' className='row' style={{ backgroundColor: 'black', opacity: 0.8 }}>

        <h1 style={{ color: 'white', marginTop: '86px', marginLeft: '20px', lineHeight: '2.5rem',fontSize:'38px' }}>
          How is the environmental quality in your neighbourhood?
        </h1>
        <svg height='70' width='300' style={{ marginTop: '-20px' }}>
          {/* <circle cx='33' cy='32' r='3' fill='#BDCCD4' /> */}
          <text x='20' y='50' fontSize='26px' fontFamily='Tw Cen MT' fill='#BDCCD4'> --Norwest City--</text>
          {/* <circle cx='220' cy='32' r='3' fill='#BDCCD4' /> */}
        </svg>
      </Row>

      <Router>
        <Switch>
          <Route exact path="/">
            <div id='description' style={{ marginLeft: '20px', fontSize: '22px' }}>
              <h3 style={{ fontWeight: 'bold', marginTop: '20px' }}>
                Welcome to the Mulpha Norwest Environmental Data Dashboard</h3>
              <p style={{color: '#4d4d4d'}}>This page demonstrates the environmental quality of your local area in real-time. This includes information about <strong>weather and heat, air quality and UV exposure</strong> that affect different aspects of your life every single day.</p>
              <ReactReadMoreReadLess charLimit={89} readMoreText={"Read more ▼"}
                readLessText={"Read less ▲"} readMoreStyle={{cursor: 'pointer', color:'#999'}} readLessStyle={{cursor: 'pointer',color:'#999'}}>
                {'These parameters can vary greatly across the city and during different times of the day. So each local area has different weather and air quality conditions allowing for different outdoor activities. For example, good weather and air quality may increase outdoor activities and motivate residents to engage in outdoor social and cultural events and community engagements. Conversely, poor environmental quality not only reduces outdoor activity but also affects your health and wellbeing, as well as the consumption and cost of electricity for our houses and local businesses. You can use this portal if you’d like to plan your outdoor activities or learn more about the local environmental conditions. This dashboard shows average daily data, real-time readings, and the forecast of weather and air quality conditions. Here, you can check: what time of the day is the hottest? When are we exposed to the lowest air quality or highest heat stress? And is it a good time to plan a trip to our public places? Please note this data is indicative as sensors may from time to time provide incorrect data due to wear and tear or unforeseen circumstances.'}
              </ReactReadMoreReadLess>
            </div>
            <Row id='Map' style={{ marginLeft: '10px', marginRight: '20px', fontFamily: 'Tw Cen MT', fontSize: '20px' }}>
              <MapWrapper onClickSensor={(sensor) => setActiveSensor(sensor)} />
            </Row>
            <OverviewWrapper />
          </Route>
          <Route path="/IndexDetails">
            <IndexDetails />
          </Route>
          <Route path="/WeatherHeat/:id">
            <StationOverview activeSensor={activeSensor}/>
          </Route>
        </Switch>
      </Router>
     
      <div id='Footer' className='row' style={{ marginTop: '40px', backgroundColor: 'black', opacity: 0.8 }}>
        <Col lg={5} md={5} sm={6}>
        <img src={UNSW} alt='UNSW' style={{marginTop: 10, marginLeft:-20, height: '5rem'}}/>
        <img src={CityFutures} alt='City Futures' style={{marginTop: 10, marginLeft: -20, height: '5rem'}}/>
        </Col>
        <Col lg={7} md={7} sm={6}>
        <p style={{color: 'white', fontSize:'0.8rem', lineHeight:'1rem'}}>The environmental sensor network and interactive report was developed by Climate-Resilient Cities lab at <strong>UNSW</strong> City Futures Research Centre.</p>
        <p style={{color: 'white',marginTop: '-0.5rem', fontSize:'0.8rem',lineHeight:'1rem'}}>This project was led by <strong>Dr. Negin Nazarian</strong> and executed in collaboration with UNSW experts (Dr. Sijie Liu, Alireza Shamakhy, and Prof Chris Pettit). </p>
        <p style={{color: 'white',marginTop: '-0.4rem', fontSize: '0.8rem',lineHeight:'1rem'}}>For more information, please contact Dr Nazarian (n.nazarian@unsw.edu.au). </p>
        </Col>
        <h4 style={{ color: 'white', lineHeight: '1rem' }}>
          Copyright © Mulpha Norwest
        </h4>
      </div>
    </Container>
  )
}
export default HomePage;