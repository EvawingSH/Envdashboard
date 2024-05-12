import LineChart1 from './LineChart1'
import LineChart2 from './LineChart2'

const LineChartChoice=({ selectedMonth, activeSensor, CompareSensor, AQIorWea, MonthStart, interval, ActivePara })=>{
    // calculated coeff based on last 30 days data
    // const Coeff = UseAQICal(selectedMonth)
    //fixed coeff based on the data between Sep 2021 ~ Jan 2022
    const Coeff={
        Coef_O3:{a: -3.562321823967782, b: 3.5236921806897428, c: 0.01177654772658368},
        Coef_NO2:{a: 0.8666518739875384, b: 1.8539100057461932, c: 0.01586594600120021},
        Coef_CO:{a: 6.123926029885666, b: -2.8517568080418583, c: 0.00024842180618219313}
     }

    if(activeSensor===CompareSensor){
        return <LineChart1
        Coeff={Coeff}  
        activeSensor={activeSensor} 
        selectedMonth={selectedMonth} 
        MonthStart={MonthStart} 
        interval={interval} 
        ActivePara={ActivePara}
        AQIorWea={AQIorWea}/>
    }else if(activeSensor!==CompareSensor){
    return(<LineChart2 
        Coeff={Coeff}
        activeSensor={activeSensor} 
        CompareSensor={CompareSensor}
        selectedMonth={selectedMonth} 
        MonthStart={MonthStart} 
        interval={interval} 
        ActivePara={ActivePara}
        AQIorWea={AQIorWea}/>)
    }
}
export default LineChartChoice