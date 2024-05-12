import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import * as Sensorinfo from "../Data/Sensorinfo.json"
import {Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
// import "./map.css"

const StationMap = ({ activeSensor }) => {

    const sensor = Sensorinfo.features.filter((d) => { return d.name === activeSensor })

    return (

        <Row>
            <Col xs={5} md={5}>
                <h2 style={{ fontFamily: 'Tw Cen MT', marginLeft: '0px', marginTop: '10px', fontWeight: 'bold' }}>
                    {sensor[0].Location}</h2>
                <p style={{ fontSize: '20px' }}>This weather station is located in XXXXXX. It is close to the main street with busy traffic, and it is a vibrant centre and home to outdoor spaces, XXXXXXXXXXXX.</p>
                <Link to="/"><p style={{ fontSize: '24px' }}>Back</p></Link>
            </Col>

            <Col style={{ marginTop: '20px' }} xs={7} md={7}>
                <MapContainer center={[sensor[0].Lat, sensor[0].Lon]} zoom={18} scrollWheelZoom={false} style={{ marginTop: 0,  height: '300px'  }}>
                    <TileLayer
                         attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
                         url="https://api.mapbox.com/styles/v1/liusijiesh/ckw21mew75rl515pie4fuxvs4/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibGl1c2lqaWVzaCIsImEiOiJja3M0MnNqY24wNWFmMnZwdGFyZHpyaGI0In0.ixbWzEpnRUcvU6PFYD7MsA"
                    />
                    <Marker key={sensor[0].name} position={[
                        sensor[0].Lat,
                        sensor[0].Lon]} >
                    </Marker>
                </MapContainer>
            </Col>
        </Row>
    )
}

export default StationMap