import { Row, Col } from 'react-bootstrap'
import BlueDe from '../images/Comparison/BlueDe.svg'
import OrangeIn from '../images/Comparison/OrangeIn.svg'
import { UseDataforOverview} from '../Data/UseDataforOverview'
import {format} from 'd3'
import equal from '../images/Comparison/equal.svg'


const InDe = (d) => {
    if (d>-0.5||d===0) {
        return  `+${format('.0f')(d)}`
    } else if (d<-0.5||d===-1) {
        return  `${format('.0f')(d)}`
    }
}


const InDeIcon=(d)=>{
    if(d>=0.5){
      return OrangeIn
    }else if(d<=-0.5){
      return BlueDe
    }else if(d>-0.5&&d<0.5){
      return equal
    }
  }

const AQIComparison = () => {

    const AllData=UseDataforOverview()
    const Data=AllData.dAQI
  
        // if(!activeSensor.PM25 &&!activeSensor.PM10 && !activeSensor.PMO3 &&!activeSensor.NO2 &&!activeSensor.CO){
    //     return<h3 style={{color:'gray'}}>Not measured.</h3>
    // }

    if(!Data){
        return<p></p>
    }
   
    const dO3=Data.dO3*100
    const dNO2=Data.dNO2*0.1
   
    return (
        <Row>
            <Col>
                {!Data.dPM25? <div ></div> :
                    <div>
                        <img alt='logo' src={InDeIcon(Data.dPM25)} height='60' width='60' style={{ marginLeft: 20 }} />
                        <h3 style={{ fontSize: '22px', marginLeft: 20 }}>{InDe(Data.dPM25)}μg/m³</h3>
                    </div>}
            </Col>
            <Col>
                {!Data.dPM10? <div ></div> :
                    <div>
                        <img alt='logo' src={InDeIcon(Data.dPM10)} height='60' width='60' style={{ marginLeft: 20 }} />
                        <h3 style={{ fontSize: '22px', marginLeft: 20 }}>{InDe(Data.dPM10)}μg/m³</h3>
                    </div>
                }
            </Col>
            <Col>
                {!Data.dO3 ? <div ></div> :
                    <div>
                        <img alt='logo' src={InDeIcon(dO3)} height='60' width='60' style={{ marginLeft: 20 }} />
                        <h3 style={{ fontSize: '22px', marginLeft: 20 }}>{InDe(dO3)}pphm</h3>
                    </div>
                }

            </Col>
            <Col>
                {!Data.dNO2 ? <div></div> :
                    <div>
                        <img alt='logo' src={InDeIcon(dNO2)} height='60' width='60' style={{ marginLeft: 20 }} />
                        <h3 style={{ fontSize: '22px', marginLeft: 20 }}>{InDe(dNO2)}pphm</h3>
                    </div>
                }
            </Col>
            <Col>
                {!Data.dCO ? <div></div> :
                    <div>
                        <img alt='logo' src={InDeIcon(Data.dCO)} height='60' width='60' style={{ marginLeft: 20 }} />
                        <h3 style={{ fontSize: '22px', marginLeft: 20 }}>{InDe(Data.dCO)}ppm</h3>
                    </div>
                }

            </Col>

        </Row>
    )

}

export default AQIComparison