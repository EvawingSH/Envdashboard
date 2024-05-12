import React from 'react';
import * as d3 from 'd3'
import {HashLink} from 'react-router-hash-link'
import LightTooltip from './LightTooltip';

const r = [70]

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
    if (d < 12) {
        return 4.71239 / 11 * d - 3.14159
    } else { }
    return 1.5708
}


//Set color for UV
const SetUvColor = (d) => {
    if (d < 3) {
        return '#4FBAE9'
    } else if (d > 2 && d < 6) {
        return '#FCD313'
    } else if (d > 5 && d < 8) {
        return '#F37920'
    } else if (d > 7 && d < 11) {
        return '#EF5423'
    } else if (d > 10) {
        return '#951920'
    }
}

const UVOverview = ({ UV }) => {


    //imporant! define what to show when loading data
    if (UV===undefined) {
        return <div style={{ marginTop: 10, color: 'gray' }}>Loading...</div>
    }

    return <svg id='UVOverview' width='160' height='200'>
        <g transform='translate(70,70)'>
            <path d={arc()} fill='#E4E8EA'></path>
            <path fill={SetUvColor(UV)} d={path({
                startAngle: -3.14159,
                endAngle: endpoint(UV)
            })}>
            </path>
            <text y='10' style={{ textAnchor: 'middle', fontFamily: 'Tw Cen MT', fontSize: '50' }}>{UV}</text>
            <text x='5' y={r - 2} style={{ fontFamily: 'Tw Cen MT', fontSize: '18' }}>0</text>
            <text x='50' y='20' style={{ fontFamily: 'Tw Cen MT', fontSize: '18' }}>11</text>
            <text x='0' y='95' style={{ fontFamily: 'Tw Cen MT', fontSize: '24' }}>UV</text>
            <circle cx='45' cy='88' r='9' fill='none' style={{ stroke: 'gray', strokeWidth: '2' }} />
            <text x='42' y='94' fill='gray' style={{ fontFamily: 'Tw Cen MT', fontSize: '22' }}>i</text>
            <LightTooltip
                interactive='true'
                title={
                    <div style={{ fontSize: 18 }}>
                        <p>The UV Index indicates the daily danger of solar UV radiation intensity.</p>
                        <HashLink to='/IndexDetails/#UVDes'>Find out more</HashLink>
                    </div>
                }
                placement='top'>
                <rect x='-15' y='75' width='80' height='25' fill='transparent' />
            </LightTooltip>
        </g>

    </svg>



}

export default UVOverview