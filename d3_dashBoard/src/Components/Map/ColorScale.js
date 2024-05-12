import { UseApiDataforMap } from '../Data/UseApiDataforMap'
import {format} from 'd3'


const width = 400



//define rain color scale and text
const RainColorScale = [
    { idx: 0, color: '#60D394', value: 0 },
    { idx: 1, color: '#51AA89', value: 8 },
    { idx: 2, color: '#499082', value: 16 },
    { idx: 3, color: '#417E7C', value: 24 },
    { idx: 4, color: '#2F5C60', value: 32 },
    { idx: 5, color: 'transparent', value: 40 }
]

//define wind color scale and text
const WindColorScale = [
    { idx: 0, color: '#E1629C', value: 0 },
    { idx: 1, color: '#B53A78', value: 2 },
    { idx: 2, color: '#B53A78' },
    { idx: 3, color: '#AA59B2', value: 12 },
    { idx: 4, color: '#AA59B2' },
    { idx: 5, color: '#8C2A7E', value: 22 },
    { idx: 6, color: '#8C2A7E' },
    { idx: 7, color: '#74207A', value: 32 },
    { idx: 8, color: 'transparent', value: 40 }
]

//define solar color scale and text
const SolarColorScale = [
    { idx: 0, color: '#F9D069', value: 0 },
    { idx: 1, color: '#F7AC6F', value: 200 },
    { idx: 2, color: '#EA8C47', value: 400 },
    { idx: 3, color: '#EA7760', value: 600 },
    { idx: 4, color: '#E84221', value: 800 },
    { idx: 5, color: 'transparent', value: 1000 }
]



const ColorScale = ({ para }) => {
    const Data = UseApiDataforMap()

    if (!Data) {
        return <pre>Loading</pre>
    }
    const MedianTemp = format('.1f')(Data[0].MedianTemp)
    const MedianHum = format('.1f')(Data[0].MedianHum)
    //define temp color scale and text
    const TempColorScale = [
        { idx: 0, color: '#184872', value: '-4' },
        { idx: 1, color: '#286C99' },
        { idx: 2, color: '#419FCC', value: '-2' },
        { idx: 3, color: '#4EB9E8' },
        { idx: 4, color: '#FBC93E', value: `${MedianTemp}*` },
        { idx: 5, color: '#F9A659' },
        { idx: 6, color: '#F06542', value: '+2' },
        { idx: 7, color: '#BA4141' },
        { idx: 8, color: 'transparent', value: '+4' },

    ]

    //define humidity color scale and text

const HumidColorScale = [
    { idx: 0, color: '#BA4141', value: '-10' },
    { idx: 1, color: '#F06542' },
    { idx: 2, color: '#F9A659', value: '-5' },
    { idx: 3, color: '#FBC93E' },
    { idx: 4, color: '#4EB9E8', value: `${MedianHum}*`  },
    { idx: 5, color: '#419FCC' },
    { idx: 6, color: '#286C99', value: '+5' },
    { idx: 7, color: '#184872' },
    { idx: 8, color: 'transparent', value: '+10' },
]
    const Parameter = (para) => {
        if (para === 'Temp') {
            return TempColorScale
        } else if (para === 'Humidity') {
            return HumidColorScale
        } else if (para === 'Rain') {
            return RainColorScale
        } else if (para === 'Wind') {
            return WindColorScale
        } else if (para === 'Solar') {
            return SolarColorScale
        }
    }


    const ScaleUnit = (para) => {
        if (para === 'Temp') {
            return '°C'
        } else if (para === 'Humidity') {
            return '%'
        } else if (para === 'Rain') {
            return 'mm'
        } else if (para === 'Wind') {
            return 'km/h'
        } else if (para === 'Solar') {
            return 'W/m²'
        }
    }
    const length = Parameter(para).length
    const widthEach = width / length

    return (
        <div>
            <svg width='700px' height='70'>
                <g>
                    <text y='22' x={widthEach * (length - 1) + 20} style={{ fontSize: 20, fontFamily: 'TW Cen MT' }}>{ScaleUnit(para)}</text>
                    {Parameter(para).map((color) => (
                        <rect y='10'
                            x={5+widthEach * color.idx + 10}
                            height='15'
                            width={widthEach}
                            fill={color.color}
                            key={color.idx}
                            style={{ strokeWidth: 1, stroke: 'white' }} />
                    ))}
                    {Parameter(para).map((scale, idx) => (
                        <text y='45' x={widthEach * idx - 2} style={{ fontFamily: 'TW Cen MT' }} key={scale.idx}>{scale.value}</text>
                    ))}
                    {para==='Temp'||para==='Humidity'? <rect y='8' 
                                                            x={width/2-10} 
                                                            height='19' 
                                                            width='8' 
                                                            style={{ fill:'#BDC4C6', strokeWidth: 2, storke:'white'}} />
                                                        :
                                                        <rect />}
                    {para==='Temp'||para==='Humidity'? <text y='65' fill='#999'>* is the median of all sensors.</text>:<text></text>}
                </g>
            </svg>
        </div>)

}

export default ColorScale