import React from 'react'
import OCOverview from './OCOverview'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import Quiet from '../images/OC/Quiet.svg'
import Moderate from '../images/OC/Moderate.svg'
import Busy from '../images/OC/Busy.svg'
import VeryBusy from '../images/OC/VeryBusy.svg'


const OCOverviewWrapper = ({ OC }) => {

    //Change name based on reading
    const ChangeName = () => {
        if (OC < 10) {
            return (Quiet)
        } else if (OC > 9 && OC < 20) {
            return (Moderate)
        } else if (OC > 19 && OC < 40) {
            return (Busy)
        } else if (OC > 39) {
            return (VeryBusy)
        } 
    }


    return (

        <Row >
            <Col xs={5} sm={5} md={5} style={{ marginLeft: 20, paddingLeft: 0, marginRight: 0 }}><OCOverview OC={OC} /></Col>
            <Col xs={5} sm={5} md={5}>
                {!OC ? <div></div> :
                    <img src={ChangeName()} alt='logo' style={{ marginTop: 15, marginLeft: 0, height: 170, width: 150 }} />
                    }
            </Col>
        </Row>

    )

}

export default OCOverviewWrapper