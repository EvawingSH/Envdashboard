import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useState } from 'react'
import Sensorinfo from '../Data/Sensorinfo.json'
import{Row, Col} from 'react-bootstrap'



const LocationDropdownHis = (props) => {
    const [sensor, setSensor]=useState(props.activeSensor)
    const Location=Sensorinfo.features.filter((d)=>{
          return d.name===sensor })
    return (
        <Row style={{marginTop: 0}}>
            
        <Col lg={3} md={4} sm={5}>
        <h4 style={{fontSize:20, marginTop: 20}}>Compare with the sensor in <br /><strong>{sensor===props.activeSensor? 'None': Location[0].Location}</strong></h4>
        </Col>
        <Col lg={3} md={3} sm={3}>
        <DropdownButton
            size='lg'
            variant="outline-dark"
            id="dropdown-basic"
            style={{ marginTop: 20, borderWidth: 2 }}
            title='Choose a Location'
            onSelect={(e)=>{props.onChangeSensor(e)
                            setSensor(e)}}
        >
            {Sensorinfo.features.map((loc) => (
                <Dropdown.Item                          
                               key={loc.name}
                               eventKey={loc.name}
                               disabled={loc.name===props.activeSensor? true : false}
                                >
                    {loc.Location}
                </Dropdown.Item>) 
        )}
        </DropdownButton>
        </Col>
        <Col lg={6} md={5} sm={4}></Col>
        </Row>

    )
}

export default LocationDropdownHis