import { UseApiData } from '../Data/UseApiData'
import AxisBottom from './AxisBottom'
import LeftAxis from './LeftAxis'
import MarksChart from './MarksChart'
import { timeDay, timeDays, timeMonth, max, extent, scaleTime, bin, format, mean, timeHours, scaleLinear } from 'd3'
import DownloadButton from './DownloadButton'
import { SensorName, yAxisLabel, yValue } from './LineChartFunc'


const width = 720
const height = 450
const margin = { top: 30, right: 60, bottom: 100, left: 60 }
const innerHeight = height - margin.top - margin.bottom
const innerWidth = width - margin.left - margin.right

const Cal_AQI = (a, b, c, AQI, Ta) => {
    return AQI - (a + b * Math.exp(c * Ta))
}

const xValue = d => new Date(d.time)
const xAxisLabel = 'Time'

const LineChart1 = ({ Coeff, selectedMonth, activeSensor, AQIorWea, MonthStart, interval, ActivePara }) => {

    const Data = UseApiData(activeSensor, selectedMonth)
    
    // console.log(Coeff)

    if (!Data.data) {
        return <pre>Loading...</pre>
    }

    const Predata = Data.data
    const PreAQI = Data.AQIdata
    // console.log(PreAQI)
    //combine different arrays (different dates' data) to one array
    // console.log(Predata)
    const data = []
    const AQIdata = []
 
    const CombinedData1 = () => {
        Predata.map(arr => data.push(...arr.data))
    }
    CombinedData1()
    // console.log(data)

    const CombinedDataAQI = () => {
        PreAQI.map(arr => AQIdata.push(...arr.data))
    }
    CombinedDataAQI()
    // console.log(AQIdata)


    //find the stop point for data, today is the stop date for this month's data, the last day of every month is the end date for previous months.
    const stop1 = max(data, xValue)
    const start = new Date(selectedMonth)
    const NextMonth = new Date(timeMonth.offset(start, 1))
    const stop4 = new Date(timeDay.offset(new Date(NextMonth), -1))



    const stop = () => {
        if (selectedMonth.getTime() === MonthStart.getTime()) {
            return stop1
        }
        return stop4
    }

    const AQIstop = () => {
        if (selectedMonth.getTime() === MonthStart.getTime()) {
            return max(AQIdata, xValue)
        }
        return stop4
    }

    //extract and process x and y scale data
    const xScale = scaleTime()
        .domain([start, stop()])
        .range([0, innerWidth])

    const tickLength = xScale.ticks().length


    const AQIxScale = scaleTime()
        .domain([start, AQIstop()])
        .range([0, innerWidth])

    const binnedDataCalc = (d) => {
        if (interval === 'Hourly') {
            return bin()
                .value(xValue)
                .domain(xScale.domain())
                .thresholds(timeHours(start, stop()))(d)
                .map(array => ({
                    MeanData: +format('.2f')(mean(array, yValue(activeSensor, ActivePara, d))),
                    airTemp: +format('.2f')(mean(array, d => +d.temperature)),
                    x0: array.x0,
                }))
        } else if (interval === 'Daily') {
            return bin()
                .value(xValue)
                .domain(xScale.domain())
                .thresholds(timeDays(start, stop()))(d)
                .map(array => ({
                    MeanData: +format('.2f')(mean(array, yValue(activeSensor, ActivePara, d))),
                    airTemp: +format('.2f')(mean(array, d => +d.temperature)),
                    x0: array.x0,
                }))
        }
    }

    const binnedData = binnedDataCalc(data)
    const binnedAQIDataPre = binnedDataCalc(AQIdata)
    // const binnedAQIData=binnedDataCalc(AQIdata)
    // console.log(binnedAQIDataPre)
    // console.log(binnedData)


    const binnedAQIData = []

    //AQI Calibration
    const AQICalibration = () => {
        if (ActivePara === 'O₃') {
            for (let i = 0; i < binnedAQIDataPre.length; i++) {
                binnedAQIData.push({
                    MeanData: (Cal_AQI(Coeff.Coef_O3.a, Coeff.Coef_O3.b, Coeff.Coef_O3.c, binnedAQIDataPre[i]['MeanData'], binnedAQIDataPre[i]['airTemp']))/10,
                    x0: binnedAQIDataPre[i]['x0']
                })
            }
        }else if(ActivePara === 'NO₂') {
            for (let i = 0; i < binnedAQIDataPre.length; i++) {
                binnedAQIData.push({
                    MeanData: (Cal_AQI(Coeff.Coef_NO2.a, Coeff.Coef_NO2.b, Coeff.Coef_NO2.c, binnedAQIDataPre[i]['MeanData'], binnedAQIDataPre[i]['airTemp']))/10,
                    x0: binnedAQIDataPre[i]['x0']
                })
            }
        }else if(ActivePara === 'CO') {
            for (let i = 0; i < binnedAQIDataPre.length; i++) {
                binnedAQIData.push({
                    MeanData: (Cal_AQI(Coeff.Coef_CO.a, Coeff.Coef_CO.b, Coeff.Coef_CO.c, binnedAQIDataPre[i]['MeanData'], binnedAQIDataPre[i]['airTemp']))/1000,
                    x0: binnedAQIDataPre[i]['x0']
                })
            }
        }else if(ActivePara === 'PM2.5'||ActivePara === 'PM10'){
            for (let i = 0; i < binnedAQIDataPre.length; i++) {
                binnedAQIData.push({
                    MeanData: binnedAQIDataPre[i]['MeanData'],
                    x0: binnedAQIDataPre[i]['x0']
                })
            }
        }
    
    }
        AQICalibration()
        xScale.nice()

        // console.log(binnedAQIData)
        // console.log(Coeff)

        const extent1 = extent(binnedData, d => d.MeanData)
        const yScale = scaleLinear()
            .domain(extent(extent1))
            .range([innerHeight, 0])
            .nice()

        const AQIyScale = scaleLinear()
            .domain(extent(binnedAQIData, d => d.MeanData))
            .range([innerHeight, 0])
            .nice()


        return (
            <div>
                <svg width={width} height={height}>
                    <g transform={`translate(${margin.left},${margin.top})`}>
                        <AxisBottom xScale={AQIorWea === 0 ? xScale : AQIxScale} innerHeight={innerHeight} tickLength={tickLength} />
                        <LeftAxis yScale={AQIorWea === 0 ? yScale : AQIyScale} innerWidth={innerWidth} />
                        <MarksChart sensor={activeSensor}
                            CompareSensor={null}
                            xScale={AQIorWea === 0 ? xScale : AQIxScale}
                            yScale={AQIorWea === 0 ? yScale : AQIyScale}
                            binnedData={AQIorWea === 0 ? binnedData : binnedAQIData} binnedData2={[]}
                            TooltipUnit={yAxisLabel(ActivePara)[1]} 
                            AQIorWea={AQIorWea}/>
                        <text className='axis-text'
                            x={innerWidth / 2}
                            textAnchor='middle'
                            y={innerHeight + 80}
                            style={{ fontSize: 18 }}>
                            {xAxisLabel}
                        </text>
                        <text className='axis-text'
                            textAnchor='middle'
                            style={{ fontSize: 18 }}
                            transform={`translate(${-40},${innerHeight / 2}) rotate(-90) `}>
                            {yAxisLabel(ActivePara)[0]}
                        </text>
                    </g>
                </svg>
                <DownloadButton
                    ParaName={yAxisLabel(ActivePara)[0]}
                    AQIorWea={AQIorWea}
                    Sensor1={AQIorWea === 0 ? SensorName(activeSensor) : "Norwest Marketown"}
                    Para1={AQIorWea === 0 ? binnedData : binnedAQIData}
                    Sensor2={null}
                    Para2={null} />
            </div>
        )

    }

    export default LineChart1