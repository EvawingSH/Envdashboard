import React from 'react'
import * as Sensorinfo from "../Data/Sensorinfo.json"
import {Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import BellaVistaPublicSchool from '../images/StationImg/BellaVistaPublicSchool.jpg'
import BellaVistaRailwayStation from '../images/StationImg/BellaVistaRailwayStation.jpg'
import CircaretailShoppingCentre from '../images/StationImg/CircaretailShoppingCentre.jpg'
import LexingtonAndNorwest from '../images/StationImg/LexingtonAndNorwest.jpg'
import LindenwoodEstate from '../images/StationImg/LindenwoodEstate.jpg'
import NorwestMainLake from '../images/StationImg/NorwestMainLake.jpg'
import TheGreensNorwest from '../images/StationImg/TheGreensNorwest.jpg'
import BellaVistaFarm from '../images/StationImg/BellaVistaFarm.jpg'
import NorwestMarketown from '../images/StationImg/NorwestMarketown.jpg'


const StationDes = ({ activeSensor }) => {

    const sensor = Sensorinfo.features.filter((d) => { return d.name === activeSensor })
    
    const ChangeImgSrc=()=>{
        if(sensor[0].name==="snla1kb02"){
            return BellaVistaFarm
        }else if(sensor[0].name==="snla1kb01"){
            return LindenwoodEstate
        }else if(sensor[0].name==="snla1kb07"){
            return BellaVistaRailwayStation
        }else if(sensor[0].name==="snla1kb09"){
            return null
        }else if(sensor[0].name==="snla1kb05"){
            return NorwestMainLake
        }else if(sensor[0].name==="snla1kb04"){
            return CircaretailShoppingCentre
        }else if(sensor[0].name==="snla1kb08"){
            return null
        }else if(sensor[0].name==="snla1kb03"){
            return LexingtonAndNorwest
        }else if(sensor[0].name==="snla1kb06"){
            return BellaVistaPublicSchool
        }else if(sensor[0].name==="mulphaict"){
            return NorwestMarketown
        }else if(sensor[0].name==="snla1kb0a"){
            return TheGreensNorwest
        }
    }

    return (

        <Row style={{marginRight:10}}>
            <Col xs={6} md={6}>
                <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '10px', fontWeight: 'bold' }}>
                    {sensor[0].Location}</h2>
                <p style={{ fontSize: '20px' }}>{sensor[0].Description}</p>
                <Link to="/"><p style={{ fontSize: '24px' }}>Back</p></Link>
            </Col>
            
            <Col style={{ marginTop: '20px' }} xs={6} md={6}>
               <img src={ChangeImgSrc()} alt='Station Location' style={{height: 270, width: 350}} />
            </Col>
        </Row>
    )
}

export default StationDes