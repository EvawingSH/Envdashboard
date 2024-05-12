import React from 'react'
import UVOverview from './UVOverview'
import { Col } from 'react-bootstrap'
import { Row } from 'react-bootstrap'
import UV02 from '../images/UV/UV02.svg'
import UV35 from '../images/UV/UV35.svg'
import UV67 from '../images/UV/UV67.svg'
import UV810 from '../images/UV/UV810.svg'
import UV11 from '../images/UV/UV11.svg'
import { HashLink } from 'react-router-hash-link'

const UVOverviewWrapper = ({ UV }) => {

    //Change name based on reading
    const ChangeName = () => {
        if (UV < 3) {
            return (UV02)
        } else if (UV > 2 && UV < 6) {
            return (UV35)
        } else if (UV > 5 && UV < 8) {
            return (UV67)
        } else if (UV > 7 && UV < 11) {
            return (UV810)
        } else if (UV > 10) {
            return (UV11)
        }
    }


    return (

        <Row >
            <Col xs={5} sm={5} md={5} style={{ marginLeft: 20, paddingLeft: 0, marginRight: 0 }}><UVOverview UV={UV} /></Col>
            <Col xs={5} sm={5} md={5}>
                {UV===undefined? <div></div>:
                <HashLink to='/IndexDetails/#UVDes'>
                    <img src={ChangeName()} alt='logo' style={{ marginTop: 0, marginLeft: 0, height: 190, width: 160 }} />
                </HashLink>
                }
            </Col>
        </Row>

    )

}

export default UVOverviewWrapper