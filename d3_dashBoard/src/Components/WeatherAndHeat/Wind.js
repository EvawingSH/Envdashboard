import React from 'react';
import * as d3 from 'd3'
import {Col} from 'react-bootstrap'
import wind from '../images/icons/wind.svg'
import {format} from 'd3'
const r=[47]

//define arc axis
const arc=d3.arc()
            .innerRadius(r-10)
            .outerRadius(r)
            .startAngle(-2.36)
            .endAngle(2.36)

//define the path
const path=d3.arc()
             .innerRadius(r-10)
             .outerRadius(r)
             .startAngle(-2.35)

// convert measurment to radian
const endpoint=(d)=>{
    if (d<16 && d>-1){
        return 4.72/15*d-2.36
    }else if(d>16){
        return 2.36
    }else if(d<0){
        return -2.35
    }
} 

//define color
const colorScale=d3.scaleLinear()
                   .domain([0,7,14])
                   .range(['#E281B2','#9A2E86','#74207A'])


const Wind=({Wind})=>{

    if (Wind===null||isNaN(Wind)){
        return<div></div>
    } 
    
    const Winddata=+format('.1f')(Wind)
    return(
            <div>
                
                <Col style={{fontSize: 22}}>
                <img src={wind} alt='logo' style={{height: 25, width: 25,marginTop: 0}} />Wind
                </Col>
                <Col>
                <svg id='Wind' height='150' width='120' style={{marginLeft: 0, marginTop: 5}}>
                    <g transform='translate(50,50)'>
                    <path d={arc()} fill='#E4E8EA'></path>
                    <path fill={colorScale(Winddata)} d={path({
                        endAngle: endpoint(Winddata)
                    })}/>
                    <text x='-15' y='20'>km/h</text>
                    <text x='-20' y='5' style={{fontSize:32}}>{Winddata}</text>
                    <text x='-50' y='50' style={{fontSize:18}}>Calm</text>
                    <text x='10' y='50' style={{fontSize:18}}>Severe</text>
                    </g>
                </svg>
                </Col>
            </div>
        )       
    
}

export default Wind