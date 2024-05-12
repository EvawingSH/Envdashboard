import React from 'react';
import * as d3 from 'd3'
import {Col} from 'react-bootstrap'
import rain from '../images/icons/water.svg'
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
    if (d<51 && d>-1){
        return 4.72/51*d-2.36
    }else if(d>50){
        return 2.36
    }else if(d<0){
        return -2.35
    }
} 

//define color
const colorScale=d3.scaleLinear()
                   .domain([0,25,50])
                   .range(['#60D394','#499082','#2E5B5F'])


const Rain=({Rain})=>{

    if (Rain===null||isNaN(Rain)){
        return<div></div>
    } 
    
    const Raindata=+format('.1f')(Rain)
    return(
            <div>
                
                <Col style={{fontSize: 22}}>
                <img src={rain} alt='logo' style={{height: 25, width: 25,marginTop: 0}} />Rain
                </Col>
                <Col>
                <svg id='Rain' height='150' width='120' style={{marginLeft:0, marginTop: 5}}>
                    <g transform='translate(50,50)'>
                    <path d={arc()} fill='#E4E8EA'></path>
                    <path fill={colorScale(Raindata)} d={path({
                        endAngle: endpoint(Raindata)
                    })}/>
                    <text x='-10' y='20'>mm</text>
                    <text x='-25' y='5' style={{fontSize:32}}>{Raindata}</text>
                    <text x='-50' y='50' style={{fontSize:18}}>Drizzle</text>
                    <text x='10' y='50' style={{fontSize:18}}>Heavy</text>
                    </g>
                </svg>
                </Col>
            </div>
        )       
    
}

export default Rain