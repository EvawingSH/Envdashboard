import React from 'react';
import * as d3 from 'd3'
import { HashLink } from 'react-router-hash-link'
import LightTooltip from './LightTooltip';


const r = [70]
//const Num=[0]

//define the arc axis
const arc = d3.arc()
    .innerRadius(r - 15)
    .outerRadius(r)
    .startAngle(-3.14159)
    .endAngle(1.5708)
//define the path of measurement
const path = d3.arc()
    .innerRadius(r - 15)
    .outerRadius(r)
// convert measurment to radian
const endpoint = (d) => {
    if (d < 201) {
        return 4.71239 / 200 * d - 3.14159
    } else {
        return 1.5708
    }
}

//Set color for donut
const SetAqiColor = (d) => {
    if (d < 51) {
        return '#286C99'
    } else if (d > 50 && d < 101) {
        return '#4FBAE9'
    } else if (d > 100 && d < 151) {
        return '#FCD313'
    } else if (d > 150 && d < 201) {
        return '#F37920'
    } else if (d > 200) {
        return '#951920'
    }
}

//draw AQI gauge
const AQIOverview = ({ AQI }) => {

    //imporant! define what to show when loading data
    if (!AQI) {
        return <div style={{ marginTop: 10, color: 'gray' }}>Loading...</div>
    }

    return <div id='AQIOverview' >
        <svg width='160' height='200'>
            <g transform='translate(70,70)'>
                <path d={arc()} fill='#E4E8EA'></path>
                <path fill={SetAqiColor(AQI)} d={path({
                    startAngle: -3.14159,
                    endAngle: endpoint(AQI)
                })}>
                </path>
                <text y='10' style={{ textAnchor: 'middle', fontFamily: 'Tw Cen MT', fontSize: '50' }}>{AQI}</text>
                <text x='5' y={r - 2} style={{ fontFamily: 'Tw Cen MT', fontSize: '18' }}>0</text>
                <text x='50' y='20' style={{ fontFamily: 'Tw Cen MT', fontSize: '18' }}>200</text>
                <text x='-10' y='95' style={{ fontFamily: 'Tw Cen MT', fontSize: '24' }}>AQI</text>
                <circle cx='45' cy='88' r='9' fill='none' style={{ stroke: 'gray', strokeWidth: '2' }} />
                <text x='42' y='94' fill='gray' style={{ fontFamily: 'Tw Cen MT', fontSize: '22' }}>i</text>
                <LightTooltip
                    interactive='true'
                    title={
                        <div style={{ fontSize: 18 }}>
                            <p>The Air Quality Index (AQI) indicates how clean or polluted the air currently is and how it is forecasted to become across the area.</p>
                            <HashLink to='/IndexDetails/#AQIDes'>Find out more</HashLink>
                        </div>
                    }
                    placement='top'>
                    <rect x='-15' y='75' width='80' height='25' fill='transparent' />
                </LightTooltip>
            </g>
        </svg>
    </div>
}

export default AQIOverview