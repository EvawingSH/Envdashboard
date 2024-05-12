import PM25 from './PM25'
import PM10 from './PM10'
import O3 from './O3'
import NO2 from './NO2.js'
import CO from './CO'
import { Col, Row } from 'react-bootstrap'
import { UseDataforOverview } from '../Data/UseDataforOverview'

const AQIWrapper = () => {

    // if(activeSensor!='ems4a7c'){
    //     return <p></p>
    // }        
    const Data = UseDataforOverview().AQI
   
    // if(!Data.pm25 &&!Data.pm10 && !Data.ozone &&!Data.nitrogendioxide &&!Data.carbonmonoxide){
    //     return<h3 style={{color:'gray'}}>Not measured.</h3>
    // }  
    const sum = Data.PM25 + Data.PM10 + Data.O3 + Data.NO2 + Data.CO
    
    if (!Data || sum === 0) {
        return <p></p>
    }

    return (
        <Row>
            <Col ><PM25 PM25={Data.PM25} /></Col>
            <Col ><PM10 PM10={Data.PM10} /></Col>
            <Col><O3 O3={+Data.O3} /></Col>
            <Col><NO2 NO2={+Data.NO2} /></Col>
            <Col><CO CO={+Data.CO} /></Col>
        </Row>
    )
}
export default AQIWrapper
