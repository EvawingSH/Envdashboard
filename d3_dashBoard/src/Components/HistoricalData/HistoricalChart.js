import React, { useState } from 'react'
import HourDaySwitch from './HourDaySwitch'
import ParameterHistory from './ParameterHistory'
import CompareandExplore from './CompareandExplore'
import LineChartChoice from './LineChartChoice'


const HistoricalChart = ({sensor}) => {
    const Dates = new Date()
    const ThisMonth = Dates.getUTCMonth()
    const ThisYear = Dates.getUTCFullYear()
    const MonthStart = new Date(ThisYear, ThisMonth, 1)

    const [interval, setInterval] = useState('Daily')
    const [ActivePara, setActivePara] = useState('Temp')
    

    const [value, setValue] = useState({
        Range: MonthStart,
        activeSensor: sensor,
        CompareSensor: sensor
    })

    const AQIorWea = () => {
        if (ActivePara === 'Temp' || ActivePara === 'Humidity' || ActivePara === 'Rain' || ActivePara === 'Wind' || ActivePara === 'Solar') {
            return 0
        } else if (ActivePara === 'PM2.5' || ActivePara === 'PM10' || ActivePara === 'O₃' || ActivePara === 'NO₂' || ActivePara === 'CO') {
            return 1
        }
    }

    return (
        <div>
            <p style={{color:"#4d4d4d", fontSize: 20}}>
            You can check and download different environmental measurements in daily or hourly aggregation. You can further expore the historical data by choosing the month on the time slider. Also, you can compare with another sensor by choosing a location from the dropdown list. Please click the button and the data will show on the graph.
            </p>
            <ParameterHistory
                onClick={(value) => setActivePara(value)}
                activeSensor={sensor} />
            <LineChartChoice 
             selectedMonth={value.Range}
             activeSensor={sensor}
             CompareSensor={value.CompareSensor}
             AQIorWea={AQIorWea()}
             MonthStart={MonthStart}
             interval={interval}
             ActivePara={ActivePara}
             />

            <h3 style={{marginTop:30}}>Create customized historical comparison</h3>
            <HourDaySwitch onSwitch={(value) => setInterval(value)} />
            <CompareandExplore activeSensor={sensor} onClickValueChange={(d) => setValue(d)} />
         </div>
    )
}

export default HistoricalChart