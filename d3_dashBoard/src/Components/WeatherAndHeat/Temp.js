import React from 'react';
import * as d3 from 'd3'
import thermometer from '../images/icons/thermometer.svg'
import {Col} from 'react-bootstrap'
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
    if (d<46 && d>0){
        return 4.72/45*d-2.36
    }else if(d>45){
        return 2.36
    }else if(d<1){
        return -2.35
    }
} 


//Set color for Temp
const SetColor = (d) => {
    if (d < 0) {
        return '#184872'
    } else if (d > -1 && d < 5) {
        return '#286C99'
    } else if (d > 4 && d < 10) {
        return '#419FCC'
    } else if (d > 9 && d < 15) {
        return '#FBC93E'
    } else if (d > 14 && d < 20) {
        return '#F9A659' 
    } else if (d > 19 && d < 25) {
        return '#F79468'
    } else if (d > 24 && d < 30) {
        return '#F06542' 
    } else if (d > 29 && d < 35) {
        return '#D64848'
    } else if (d > 34 && d < 40) {
        return '#BA4141' 
    } else if (d > 45) {
        return '#802424'
    }
}




const Temp=({Temp})=>{
   
    if (Temp===null||isNaN(Temp)){
        return<div>Loading...</div>
    } 

    const Tempdata=+format('.0f')(Temp)
    
    return(
            <div>
                
                <Col style={{fontSize: 22}}>
                <img src={thermometer} alt='logo' style={{height: 25, width: 25,marginTop: 0}} />Temp
                </Col>
                <Col>
                <svg id='Temp' height='150' width='100' style={{marginLeft: 0, marginTop: 5}}>
                    <g transform='translate(50,50)'>
                    <path d={arc()} fill='#E4E8EA'></path>
                    <path fill={SetColor(Tempdata)} d={path({
                        endAngle: endpoint(Tempdata)
                    })}/>
                    <text x='-10' y='20'>°C</text>
                    <text x='-20' y='5' style={{fontSize:32}}>{Tempdata}</text>
                    <text x='-45' y='50' style={{fontSize:18}}>Cold</text>
                    <text x='20' y='50' style={{fontSize:18}}>Hot</text>
                    </g>
                </svg>
                </Col>
            </div>
        )       
    
}

export default Temp