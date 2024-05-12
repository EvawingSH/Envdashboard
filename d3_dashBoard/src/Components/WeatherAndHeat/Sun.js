import React  from 'react';
import * as d3 from 'd3'
import {Col} from 'react-bootstrap'
import sunLine from '../images/icons/sunLine.svg'
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
    if (d<1.5 && d>-1){
        return 4.72/1.4*d-2.36
    }else if(d>1.5){
        return 2.36
    }else if(d<0){
        return -2.35
    }
} 

//define color
const colorScale=d3.scaleLinear()
                   .domain([0,0.7,1.4])
                   .range(['#F9E178','#F7A91D','#EF5423'])


const Sun=({Solar})=>{
 
    if (Solar===null||isNaN(Solar)||Solar===undefined){
        return<div></div>
    } 
 
    const Solardata=+format('.1f')(Solar/1000)
    
    return(
            <div>
                
                <Col style={{fontSize: 22}}>
                <img src={sunLine} alt='logo' style={{height: 25, width: 25,marginTop: 0}} />Sun
                </Col>
                <Col>
                <svg id='Wind' height='150' width='120' style={{marginLeft: 0, marginTop: 5}}>
                    <g transform='translate(50,50)'>
                    <path d={arc()} fill='#E4E8EA'></path>
                    <path fill={colorScale(Solardata)} d={path({
                        endAngle: endpoint(Solardata)
                    })}/>
                    <text x='-22' y='20'>kW/m²</text>
                    <text x='-20' y='5' style={{fontSize:32}}>{Solardata}</text>
                    <text x='-50' y='50' style={{fontSize:18}}>Dim</text>
                    <text x='10' y='50' style={{fontSize:18}}>Glare</text>
                    </g>
                </svg>
                </Col>
            </div>
        )       
    
}

export default Sun