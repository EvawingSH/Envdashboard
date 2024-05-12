import React from 'react'
import AQIOverview from './AQIOverview'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import Good from '../images/AQI/Good.svg'
import Fair from '../images/AQI/Fair.svg'
import Poor from '../images/AQI/Poor.svg'
import VeryPoor from '../images/AQI/VeryPoor.svg'
import ExtremelyPoor from '../images/AQI/ExtremelyPoor.svg'
import { HashLink } from 'react-router-hash-link'


const AQIOverviewWrapper=({AQI})=>{

   

    //Change name based on reading
    const ChangeName = () => {
        if (AQI < 51) {
            return (Good)
        } else if (AQI > 50 && AQI < 101) {
            return (Fair)
        } else if (AQI > 100 && AQI < 151) {
            return (Poor)
        } else if (AQI > 150 && AQI < 201) {
            return (VeryPoor)
        } else if (AQI > 200) {
            return (ExtremelyPoor)
        }
    }

        return (

            <Row >
                <Col xs={5} sm={5} md={5} style={{ marginLeft: 20, paddingLeft: 0, marginRight: 0 }}><AQIOverview AQI={AQI}/></Col>
                <Col xs={5} sm={5} md={5} style={{ marginRight: 10 }}>
                {!AQI ? <div></div> :
                    <HashLink to='/IndexDetails/#AQIDes'>
                        <img src={ChangeName()} alt='logo' style={{ marginTop: 20, marginLeft: 0, height: 170, width: 130 }} />
                    </HashLink>
                    }
                    
                </Col>
            </Row>

        )
    
}

export default AQIOverviewWrapper

