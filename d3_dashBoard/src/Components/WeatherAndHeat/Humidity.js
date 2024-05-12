import React from 'react';
import * as d3 from 'd3'
import {Col} from 'react-bootstrap'
import humidity from '../images/icons/humidity.svg'
import{format}from'd3'

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
    if (d<101 && d>-1){
        return 4.72/101*d-2.36
    }else if(d>100){
        return 2.36
    }else if(d<0){
        return -2.35
    }
} 

//define color
const colorScale=d3.scaleLinear()
                   .domain([0,45,90])
                   .range(['#4FBAE9','#419FCC','#184872'])


const Humidity=({Humidity})=>{
    if (Humidity===null||isNaN(Humidity)){
        return<div>Loading...</div>
    } 
    const Humdata=+format('.0f')(Humidity)
    return(
            <div>
                
                <Col style={{fontSize: 22}}>
                <img src={humidity} alt='logo' style={{height: 25, width: 25,marginTop: 0}} />Humidity
                </Col>
                <Col>
                <svg id='Humidity' height='150' width='120' style={{marginLeft: 0, marginTop: 5}}>
                    <g transform='translate(50,50)'>
                    <path d={arc()} fill='#E4E8EA'></path>
                    <path fill={colorScale(Humdata)} d={path({
                        endAngle: endpoint(Humdata)
                    })}/>
                    <text x='-5' y='20'>%</text>
                    <text x='-25' y='5' style={{fontSize:32}}>{Humdata}</text>
                    <text x='-45' y='50' style={{fontSize:18}}>Dry</text>
                    <text x='5' y='50' style={{fontSize:18}}>Humid</text>
                    </g>
                </svg>
                </Col>
            </div>
        )       
    
}

export default Humidity