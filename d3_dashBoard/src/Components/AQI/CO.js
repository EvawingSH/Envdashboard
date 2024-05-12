import * as d3 from 'd3'
import {Col} from 'react-bootstrap'

const r=47
const Maxaxis=18
const MaxAllow=9

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
    if (d<Maxaxis && d>0){
        return 4.72/Maxaxis*d-2.36
    }else if(d>Maxaxis){
        return 2.36
    }else if(d<1){
        return -2.35
    }
} 

//Set color for donut
const SetColor = (d) => {
    if (d< 6) {
        return '#286C99'
    } else if (d > 5.9 && d < 9) {
        return '#4FBAE9'
    } else if (d > 8.9 && d < 13.5) {
        return '#FCD313'
    } else if (d > 13.4 && d < 18) {
        return '#F37920'
    } else if (d > 17.9) {
        return '#951920'
    }
}


//define the parameters for line
const Deg1=-135+(270/Maxaxis*MaxAllow)
const x1=(r-12)*Math.sin(Deg1)
const y1=-1*(r-12)*Math.cos(Deg1)
const x2=(r+2)*Math.sin(Deg1)
const y2=-1*(r+2)*Math.cos(Deg1)

const CO=({CO})=>{
   
    if (!CO){
        return(<div>
            <Col style={{fontSize: 22}}>
                    <svg width='100' height='30'>
                <text x='33' y='20'>CO</text>
                </svg>
                </Col>
                <Col>
                <svg id='CO' height='150' width='100' style={{marginLeft: 0, marginTop: 5}}>
                    <g transform='translate(50,60)'>
                    <path d={arc()} fill='#E4E8EA'></path>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} style={{stroke: 'black', strokeWidth:'3px'}}></line>
                    <text x={+x1} y={+y1-12}>{MaxAllow}*</text>
                    <text x='-18' y='20'>ppm</text>
                    <text x='-25' y='5' fill='gray'style={{fontSize:28}}>NaN</text>
                    <text x='-35' y='50' style={{fontSize:18}}>0</text>
                    <text x='20' y='50' style={{fontSize:18}}>18</text>
                    </g>
                </svg>
                </Col>
        </div>)
    } 
    
    return(
            <div>
                
                <Col style={{fontSize: 22}}>
                    <svg width='100' height='30'>
                <text x='33' y='20'>CO</text>
                </svg>
                </Col>
                <Col>
                <svg id='Temp' height='150' width='100' style={{marginLeft: 0, marginTop: 5}}>
                    <g transform='translate(50,60)'>
                    <path d={arc()} fill='#E4E8EA'></path>
                    <path fill={SetColor(CO)} d={path({
                        endAngle: endpoint(CO)
                    })}/>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} style={{stroke: 'black', strokeWidth:'3px'}}></line>
                    <text x={+x1} y={+y1-12}>{MaxAllow}*</text>
                    <text x='-18' y='20'>ppm</text>
                    <text x='-25' y='5' style={{fontSize:32}}>{+d3.format('.1f')(CO)}</text>
                    <text x='-35' y='50' style={{fontSize:18}}>0</text>
                    <text x='20' y='50' style={{fontSize:18}}>18</text>
                    </g>
                </svg>
                </Col>
            </div>
        )       
    
}

export default CO