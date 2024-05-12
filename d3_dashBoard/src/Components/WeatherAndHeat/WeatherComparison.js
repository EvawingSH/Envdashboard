import React from 'react'
import {Row, Col} from 'react-bootstrap'
import BlueDe from '../images/Comparison/BlueDe.svg'
import BlueIn from '../images/Comparison/BlueIn.svg'
import GreenDe from '../images/Comparison/GreenDe.svg'
import GreenIn from '../images/Comparison/GreenIn.svg'
import OrangeDe from '../images/Comparison/OrangeDe.svg'
import OrangeIn from '../images/Comparison/OrangeIn.svg'
import RedDe from '../images/Comparison/RedDe.svg'
import RedIn from '../images/Comparison/RedIn.svg'
import RoseDe from '../images/Comparison/RoseDe.svg'
import RoseIn from '../images/Comparison/RoseIn.svg'
import equal from '../images/Comparison/equal.svg'
import {format} from 'd3'

const InDe=(d)=>{
    if (d>0||d===0){
        return `+${format('.1f')(d)}`
    }else if(d<0){
        return `${format('.1f')(d)}`
    }
}

const WeatherComparison =({DataNow, Data})=>{

   
  if (!Data){
    return <pre>Loading...</pre>
  }
  
  const dTempicon=()=>{
    if(Data.dTemp>0){
      return RedIn
    }else if(Data.dTemp<0){
      return RedDe
    }else if(Data.dTemp===0){
      return equal
    }
  }

  const dHumicon=()=>{
    if(Data.dHumidity>0){
      return BlueIn
    }else if(Data.dHumidity<0){
      return BlueDe
    }else if(Data.dHumidity===0){
      return equal
    }
  }

  const dRainicon=()=>{
    if(Data.dRain>0){
      return GreenIn
    }else if(Data.dRain<0){
      return GreenDe
    }else if(Data.dRain===0){
      return equal
    }
  }

  const dWindicon=()=>{
    if(Data.dWind>0){
      return RoseIn
    }else if(Data.dWind<0){
      return RoseDe
    }else if(Data.dWind===0){
      return equal
    }
  }

  const dSolaricon=()=>{
    if(Data.dSolar>49){
      return OrangeIn
    }else if(Data.dSolar<-49){
      return OrangeDe
    }else if(Data.dSolar>-50||Data.dSolar<50){
      return equal
    }
  }

  return(
       <Row>
           <Col>
             <img alt='logo' src={dTempicon()}
               height='60' width='60' style={{marginLeft: 20}}/>
             <h3 style={{fontSize: '22px', marginLeft: 20}}>{InDe(Data.dTemp)}°C</h3>
           </Col>
           <Col>
             <img alt='logo' src={dHumicon()} height='60' width='60' style={{marginLeft: 20}}/>
             <h3 style={{fontSize: '22px', marginLeft: 20}}>{InDe(Data.dHumidity)}%</h3>
           </Col>
           <Col>
           {DataNow.precipitation===null? <div ></div>:
           <div>
             <img alt='logo' src={dRainicon()} height='60' width='60' style={{marginLeft: 20}}/>
             <h3 style={{fontSize: '22px', marginLeft: 20}}>{InDe(Data.dRain)}mm</h3>
           </div>
           } 
           </Col>
           <Col>
           {DataNow.windspeed===null? <div></div>:
           <div>
             <img alt='logo' src={dWindicon()} height='60' width='60' style={{marginLeft: 20}}/>
             <h3 style={{fontSize: '22px', marginLeft: 10}}>{InDe(Data.dWind)}km/h</h3>
           </div>
           }
           </Col>
           <Col>
           {DataNow.windspeed===null? <div></div>:
           <div>
             <img alt='logo' src={dSolaricon()} height='60' width='60' style={{marginLeft: 20}}/>
             <h3 style={{fontSize: '22px', marginLeft: 10}}>{InDe(Data.dSolar/1000)}kW/m2</h3>
           </div>
           }   
           </Col>     
       </Row>
   )

}

export default WeatherComparison