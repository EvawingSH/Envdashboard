import leaf from '../images/icons/leaf.svg'
import sunLine from '../images/icons/sunLine.svg'
import thermometer from '../images/icons/thermometer.svg'
import { Row, Col } from 'react-bootstrap'
import AQIOverviewWrapper from './AQIOverviewWrapper'
import UTCIOverviewWrapper from './UTCIOverviewWrapper'
import UVOverviewWrapper from './UVOverviewWrapper'
import { UseDataforOverview } from '../Data/UseDataforOverview'
import { useState, useEffect } from 'react'
import { UseUVApi } from '../Data/UseUVApi'



const OverviewWrapper = () => {

  const [data, setData] = useState({
    utci: null,
    AQI: null,
    UV: null
  })

 
  const Inputs = UseDataforOverview()
  //const UVpre = UseUVApi()
  // console.log(UVpre)
  const UVpre=2
  const Temp = Inputs.Weather.Temp
  const Hum = Inputs.Weather.Hum
  const WS = Inputs.Weather.WS
  const Solar = Inputs.Weather.Solar
  const PM25 = Inputs.AQI.PM25
  const PM10 = Inputs.AQI.PM10
  const O3 = Inputs.AQI.O3
  const NO2 = Inputs.AQI.NO2
  const CO = Inputs.AQI.CO
  // const Overview = [Temp, Hum, WS, Solar, PM25, PM10, O3, NO2, CO]
  const Overview=[Temp, Hum, WS, Solar, 2,10,3,2,1]

  useEffect(() => {
    // fetch("https://mulpha-norwest-server-test.herokuapp.com/overview", {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'POST',
    //   body: JSON.stringify(Overview)
    // }).then(res => res.json())
    //   .then(
    //     data => {
    //       setData({
    //         utci: data.utci,
    //         AQI: data.AQI,
    //         UV: UVpre
    //       })
    //     }
    //   )

    setData({
      utci: 25,
      AQI: 30,
      UV: 3
    })

  }, [Inputs])

  if (data === 'undefined') {
    return <pre>Loading...</pre>
  }

  return (

    <div id='Overview' style={{ marginLeft: '20px', fontFamily: 'Tw Cen MT', fontSize: '22px', marginRight: '30px', borderTop: '2px solid black' }}>
      <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '0px', fontWeight: 'bold' }}>
        Overview </h2>
      <p style={{ color: '#4d4d4d' }}>This section displays the real-time environmental quality in Norwest. The sensor data is aggregated and translated into environmental indicators that are displayed using visual analogue scales.</p>

      <Row style={{ marginLeft: 0, paddingLeft: 0, marginRight: 0, marginTop: 30 }}>
        <Col xs={12} sm={6} md={6} style={{ fontSize: 24 }}>
          <img src={leaf} alt='logo' style={{ height: 30, width: 30, marginBottom: 10 }} /> Air Quality Index
          <AQIOverviewWrapper AQI={data.AQI} />
        </Col>
        <Col style={{ fontSize: 24 }}>
          <img src={sunLine} alt='logo' style={{ height: 30, width: 30, marginBottom: 10 }} /> UV Index
          <UVOverviewWrapper UV={data.UV} />
        </Col>
        <hr style={{ borderWidth: '3px', height: '2px', color: 'black' }} />
      </Row>
      <Row style={{ marginLeft: 0, paddingLeft: '0px', marginRight: '0px' }}>
        {/* <Col sm={3} md= {3} style={{ fontSize: 24 }}>
         </Col> */}
        <Col xs={12} sm={6} md={6} style={{ fontSize: 24 }}>
          <img src={thermometer} alt='logo' style={{ height: 30, width: 30, marginBottom: 10 }} /> Heat Stress
          <UTCIOverviewWrapper UTCI={data.utci} />
        </Col>
        <Col sm={3} md={3} style={{ fontSize: 24 }}>
          {/* <img src={threePeople} alt='logo' style={{ height: 30, width: 30, marginBottom: 10 }} /> Occupancy Count
            <OCOverviewWrapper OC={25} /> */}
        </Col>
      </Row>

    </div>
  )
}

export default OverviewWrapper