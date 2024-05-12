import Button from 'react-bootstrap/Button'
import { CSVLink } from 'react-csv'
import { useRef } from 'react'


const DownloadButton = (props) => {

    const headers = () => {
        if (props.AQIorWea === 1) {
            return [
                { label: `${props.Sensor1}-${props.ParaName}`, key: 'MeanData' },
                { label: 'Time', key: 'x0' },
            ]
        }else if (props.AQIorWea === 0 && props.Sensor2===null){
            return [
                { label: `${props.Sensor1}-${props.ParaName}`, key: 'MeanData' },
                { label: 'Time', key: 'x0' },
            ]
        }else if (props.AQIorWea === 0 && props.Sensor2 !== props.Sensor1) {
            return [
                { label: `${props.Sensor1}-${props.ParaName}`, key: 'MeanData' },
                { label: `${props.Sensor2}-${props.ParaName}`, key: 'MeanData2'},
                { label: 'Time', key: 'x0' },
            ]
        }
    } 
    
    const data2=[]

    
    const data=()=>{
        if (props.AQIorWea === 1) {
            return props.Para1
        }else if (props.AQIorWea === 0 && props.Sensor2===null){
            return props.Para1
        }else if(props.AQIorWea === 0 && props.Sensor2 !== props.Sensor1) {
            for (let j=0; j<props.Para1.length; j++){
              data2.push({x0: props.Para1[j]['x0'], 
                MeanData: props.Para1[j]['MeanData'], 
                MeanData2: props.Para2[j]['MeanData'],
                })
         }
         return data2
        }
    } 
    const dataOutput=data()
   
    const csvLink = useRef()

    const getButtonRef = () => {
        csvLink.current.link.click()
    }

    return (
        <div>
            <svg width='190' height='80'>
                <text y='50' style={{ fontSize: 20 }}>Download the data</text>
            </svg>
            <Button size='lg' variant='secondary' onClick={getButtonRef}>
                Download
            </Button>
            <CSVLink
                data={dataOutput}
                filename="Report.csv"
                ref={csvLink}
                headers={headers()}
            />
        </div>
    )

}
export default DownloadButton