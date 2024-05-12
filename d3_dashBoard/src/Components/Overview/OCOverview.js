import React from 'react';
import * as d3 from 'd3'
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
    if (d < 50) {
        return 4.71239 / 50 * d - 3.14159
    } else {
        return 1.5708
    }
}


const OCOverview = ({ OC }) => {

    //imporant! define what to show when loading data
    if (!OC) {
        return <div style={{ marginTop: 10, color: 'gray' }}>Not measured.</div>
    }

    return <svg id='OCOverview' width='160' height='200'>
        <g transform='translate(70,70)'>
            <path d={arc()} fill='#E4E8EA'></path>
            <path fill='#F37920' d={path({
                startAngle: -3.14159,
                endAngle: endpoint(OC)
            })}>
            </path>
            <text y='10' style={{ textAnchor: 'middle', fontFamily: 'Tw Cen MT', fontSize: '50' }}>{OC}</text>
            <text x='5' y={r - 2} style={{ fontFamily: 'Tw Cen MT', fontSize: '18' }}>0</text>
            <text x='50' y='20' style={{ fontFamily: 'Tw Cen MT', fontSize: '18' }}>50</text>
            <text x='-25' y='95' style={{ fontFamily: 'Tw Cen MT', fontSize: '24' }}>Count</text>
            <circle cx='45' cy='88' r='9' fill='none' style={{ stroke: 'gray', strokeWidth: '2' }} />
            <text x='42' y='94' fill='gray' style={{ fontFamily: 'Tw Cen MT', fontSize: '22' }}>i</text>

            <LightTooltip
                interactive='true'
                title={
                    <div style={{ fontSize: 18 }}>
                        <p>Count is the number of people passing by.</p>
                        {/* <HashLink to='/IndexDetails/#UVDes'>Find out more</HashLink> */}
                    </div>
                }
                placement='top'>
                <rect x='-15' y='75' width='80' height='25' fill='transparent' />
            </LightTooltip>
        </g>

    </svg>



}

export default OCOverview