import React from 'react';
import * as d3 from 'd3'
import { HashLink } from 'react-router-hash-link'
import LightTooltip from './LightTooltip'

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
    if (d < -40) {
        return -3.14159
    } else if (d > 50) {
        return 1.5708
    } else if (d > -41 && d < 0) {
        return 4.71239 / 60 * d
    } else if (d > -1) {
        return 4.71239 / 50 * d - 3.14159
    }
}
//define range
const start = (d) => {
    if (d < 0) {
        return -40
    } else if (d > -1) {
        return 0
    }
}

const end = (d) => {
    if (d < 0) {
        return 20
    } else if (d > -1) {
        return 50
    }
}

//Set color for UTCI donut
const SetUtciColor = (d) => {
    if (d < -40) {
        return '#184872'
    } else if (d > -41 && d < -26) {
        return '#286C99'
    } else if (d > -27 && d < -12) {
        return '#419FCC'
    } else if (d > -14 && d < 0) {
        return '#4FBAE9'
    } else if (d > -1 && d < 9) {
        return '#88CDE5'
    } else if (d > 8 && d < 26) {
        return '#F7E69A'
    } else if (d > 25 && d < 31) {
        return '#FCD313'
    } else if (d > 30 && d < 38) {
        return '#F37920'
    } else if (d > 37 && d < 46) {
        return '#EF5423'
    } else if (d > 45) {
        return '#951920'
    }
}

const UTCIOverview = ({ UTCI }) => {

    //imporant! define what to show when loading data
    if (!UTCI) {
        return <div style={{ marginTop: 10, color: 'gray' }}>Loading...</div>
    }

    return <svg id='UTCIOverview' width='160' height='200'>
        <g transform='translate(70,70)'>
            <path d={arc()} fill='#E4E8EA'></path>
            <path fill={SetUtciColor(UTCI)} d={path({
                startAngle: -3.14159,
                endAngle: endpoint(UTCI)
            })}>
            </path>
            <text y='10' style={{ textAnchor: 'middle', fontFamily: 'Tw Cen MT', fontSize: '50' }}>{UTCI}</text>
            <text x='5' y={r - 2} style={{ fontFamily: 'Tw Cen MT', fontSize: '18' }}>{start(UTCI)}</text>
            <text x='50' y='20' style={{ fontFamily: 'Tw Cen MT', fontSize: '18' }}>{end(UTCI)}</text>
            <text x='-15' y='95' style={{ fontFamily: 'Tw Cen MT', fontSize: '24' }}>UTCI</text>
            <circle cx='45' cy='88' r='9' fill='none' style={{ stroke: 'gray', strokeWidth: '2' }} />
            <text x='42' y='94' fill='gray' style={{ fontFamily: 'Tw Cen MT', fontSize: '22' }}>i</text>
            <LightTooltip
                interactive='true'
                title={
                    <div style={{ fontSize: 18 }}>
                        <p>The Universal Thermal Climate Index (UTCI) is used to indicate the current heat stress level.</p>
                        <HashLink to='/IndexDetails/#UTCIDes'>Find out more</HashLink>
                    </div>
                }
                placement='top'>
                <rect x='-15' y='75' width='80' height='25' fill='transparent' />
            </LightTooltip>
        </g>
    </svg>

}

export default UTCIOverview