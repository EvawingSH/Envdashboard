import React from 'react'
import UTCIOverview from './UTCIOverview'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import ExtremeCS from '../images/Heat/ExtremeCS.svg'
import ExtremeHS from '../images/Heat/ExtremeHS.svg'
import ModerateCS from '../images/Heat/ModerateCS.svg'
import ModerateHS from '../images/Heat/ModerateHS.svg'
import NoThermalS from '../images/Heat/NoThermalS.svg'
import SlightCS from '../images/Heat/SlightCS.svg'
import StrongCS from '../images/Heat/StrongCS.svg'
import StrongHS from '../images/Heat/StrongHS.svg'
import VeryStrongCS from '../images/Heat/VeryStrongCS.svg'
import VeryStrongHS from '../images/Heat/VeryStrongHS.svg'
import { HashLink } from 'react-router-hash-link'


const UTCIOverviewWrapper = ({ UTCI }) => {



    //Change name based on reading
    const ChangeName = () => {
        if (UTCI < -40) {
            return (ExtremeCS)
        } else if (UTCI > -41 && UTCI < -26) {
            return (VeryStrongCS)
        } else if (UTCI > -27 && UTCI < -12) {
            return (StrongCS)
        } else if (UTCI > -14 && UTCI < 0) {
            return (ModerateCS)
        } else if (UTCI > -1 && UTCI < 9) {
            return (SlightCS)
        } else if (UTCI > 8 && UTCI < 26) {
            return (NoThermalS)
        } else if (UTCI > 25 && UTCI < 32) {
            return (ModerateHS)
        } else if (UTCI > 31 && UTCI < 38) {
            return (StrongHS)
        } else if (UTCI > 37 && UTCI < 46) {
            return (VeryStrongHS)
        } else if (UTCI > 45) {
            return (ExtremeHS)
        }
    }


    return (

        <Row>
            <Col xs={5} sm={5} md={5} style={{ marginLeft: 20, paddingLeft: 0, marginRight: 0 }}><UTCIOverview UTCI={UTCI} /></Col>
            <Col xs={5} sm={5} md={5} >
                {!UTCI?<div></div>:
                <HashLink to='/IndexDetails/#UTCIDes'>
                    <img src={ChangeName()} alt='logo' style={{ marginTop: 10, marginLeft: 10, height: 160, width: 130 }} />
                </HashLink>
                }
            </Col>
        </Row>

    )

}

export default UTCIOverviewWrapper