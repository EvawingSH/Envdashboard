import './HistoricalData.css'
import {xAxisTickFormat} from './LineChartFunc'


const AxisBottom = ({ xScale, innerHeight, tickLength }) =>
    xScale.ticks().map(tickValue => (
        <g className='tick' key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
            <line
                x1='0'
                y1='0'
                x2='0'
                y2={innerHeight}
                />
            <text style={{ textAnchor: 'middle', fontSize: 14 }} dy='.71em' y={innerHeight + 10} transform={`rotate(-90, 5, ${innerHeight+25})`}>
                <tspan>{xAxisTickFormat(tickLength, tickValue).length===2?xAxisTickFormat(tickLength, tickValue)[0]:xAxisTickFormat(tickLength, tickValue)}</tspan>
                <tspan dx='-42' dy='15' >{xAxisTickFormat(tickLength, tickValue).length===2?xAxisTickFormat(tickLength, tickValue)[1]: ''}</tspan>
            </text>
        </g>))

export default AxisBottom