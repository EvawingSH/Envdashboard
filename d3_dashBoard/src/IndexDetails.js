import { Link } from 'react-router-dom'
import UTCI from './Components/images/IndexDetails/UTCI.svg'
import AQIEveryone from './Components/images/IndexDetails/AQIEveryone.svg'
import AQISen from './Components/images/IndexDetails/AQISen.svg'
import UVOverview from './Components/images/IndexDetails/UVOverview.svg'

const IndexDetails = () => {


    return (
        <div className='IndexDetails'>

            <div id='UTCIDes' style={{ marginLeft: '20px', fontFamily: 'Tw Cen MT', marginRight: '30px', marginBottom: '20px'}}>
                <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px', fontWeight: 'bold' }}>
                    Heat Stress</h2>
                <h3 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px' }}>
                    Definition</h3>
                <p style={{fontSize: '20px'}}>The human body needs to maintain a body temperature of approximately 37°C. Heat stress refers to the condition when the human body is exposed to extreme heat and is unable to sufficiently cool itself. When the human body is not able to balance its thermal regulation heat-related illness happens. Providing shades, drinking water, and reducing physical activities could reduce the risk of heat-related illness. Here, we use the Universal Thermal Climate Index (UTCI) as the heat stress indicator. UTCI (°C) combines four environmental parameters (air temperature, humidity, wind speed, and radiation exposure) with two parameters relating to our metabolic rate and clothing level. There are 10 UTCI thermal stress categories defined that relate the equivalent temperature with heat stress categories.</p>
                <img src={UTCI} alt='UTCI' style={{ marginTop: 20, marginLeft: 0, height: 1400, width: 700 }} />
                <div style={{fontSize:'28px'}}>
                <Link to="/">Back</Link>
                </div>
            </div>

            <div id='AQIDes' style={{marginTop: '-15px',marginLeft: '20px', fontFamily: 'Tw Cen MT', marginRight: '30px', marginBottom: '20px', borderTop: '2px solid black' }}>
                <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px', fontWeight: 'bold' }}>
                    Air Quality Index</h2>
                <h3 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px' }}>
                    Definition</h3>
                <p style={{fontSize:'20px'}}>Air pollutants are solid, liquid, or gas particles that are introduced into the Earth’s atmosphere naturally or from human activity, which adversely affect people’s health. The Air Quality Index (AQI) indicates how clean or polluted the air currently is and how it is forecasted to become across the area. The AQI has six rankings: good, moderate, unhealthy for sensitive groups, unhealthy, very unhealthy, and hazardous. Good air quality ranking is defined for conditions when pollutants pose little or there is no threat. The activity guide below (taken from NSW Department of Planning, Industry, and Environment) has been derived by categorising air quality into colour indicators, based on threshold values for air pollutants’ concentrations and visibility data. Go with the colours and follow the recommended actions to protect your health.</p>
                <img src={AQISen} alt='AQI for sensitive people' style={{ marginTop: 10, marginLeft: 0, height: 1250, width: 700 }} />
                <img src={AQIEveryone} alt='AQI for everyone' style={{ marginTop: 30, marginLeft: 0, height: 1250, width: 700 }} />
                <div style={{fontSize: '28px'}}>
                <Link to="/">Back</Link>
                </div>
            </div>
            <div id='UVDes' style={{ marginTop: '-15px',marginLeft: '20px', fontFamily: 'Tw Cen MT', marginRight: '30px', marginBottom: '20px', borderTop: '2px solid black' }}>
                <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px', fontWeight: 'bold' }}>
                    UV Index</h2>
                <h3 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px' }}>
                    Definition</h3>
                <p style={{fontSize: '20px'}}>Australia has one of the highest levels of ultraviolet (UV) exposure. It is essential to know the information on UV exposure to protect the population against skin cancer. The UV Index indicates the daily danger of solar UV radiation intensity. Each point on the Index scale is equivalent to 25 mW/m2 of UV radiation. It has five rankings: low, moderate, high, very high, extreme.</p>
                <p style={{fontSize: '20px'}}>The sun protection times in the forecast are the times of the day when the UV Index is 3 or above in clear sky conditions. During the sun protection times, it is recommended to apply sun protection measures such as slip (sun protective clothing), slop (sunscreen SPF 30+), slap (hat), seek (shade), and slide (sunglasses).</p>
                <img src={UVOverview} alt='UV' style={{ marginTop: 0, marginLeft: 0, height: 1000, width: 700 }} />
                <div style={{fontSize: '28px'}}>
                <Link to="/">Back</Link>
                </div>
            </div>

        </div>
    )

}

export default IndexDetails