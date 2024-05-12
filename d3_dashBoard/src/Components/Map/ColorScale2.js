
const width = 400

//define temp color scale and text
const TempColorScale = [
    { idx: 0, color: '#184872', value: -5 },
    { idx: 1, color: '#286C99' },
    { idx: 2, color: '#419FCC', value: 5 },
    { idx: 3, color: '#4EB9E8' },
    { idx: 4, color: '#FBC93E', value: 15 },
    { idx: 5, color: '#F9A659' },
    { idx: 6, color: '#F79468', value: 25 },
    { idx: 7, color: '#F06542' },
    { idx: 8, color: '#D64848', value: 35 },
    { idx: 9, color: '#BA4141' },
    { idx: 10, color: '#802424', value: 45 },
    { idx: 11, color: 'transparent', value: 50 },
]


//define humidity color scale and text

const HumidColorScale = [
    { idx: 0, color: '#4EB9E8', value: 0 },
    { idx: 1, color: '#419FCC', value: 20 },
    { idx: 2, color: '#3883AE', value: 40 },
    { idx: 3, color: '#286C99', value: 60 },
    { idx: 4, color: '#194973', value: 80 },
    { idx: 5, color: 'transparent', value: 100 }
]

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

    const Parameter = (para) => {
        if (para === 'Temp') {
            return TempColorScale
        } else if (para === 'Humidity') {
            return HumidColorScale
        } else if (para === 'Rain') {
            return RainColorScale
        } else if (para === 'Wind') {
            return WindColorScale
        }else if (para === 'Solar') {
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
        }else if (para === 'Wind') {
            return 'km/h'
        }else if (para === 'Solar') {
            return 'W/m²'
        }
    }
    const length = Parameter(para).length
    const widthEach = width / length

    return (
        <div>
            <svg width='500px' height='50'>
                <g>
                    <text y='25' x={widthEach * (length - 1) + 20} style={{ fontSize: 20, fontFamily: 'TW Cen MT' }}>{ScaleUnit(para)}</text>
                    {Parameter(para).map((color) => (
                        <rect y='10'
                            x={widthEach * color.idx + 10}
                            height='15'
                            width={widthEach}
                            fill={color.color}
                            key={color.idx}
                            style={{ stokeWidth: 1, stroke: 'white' }} />
                    ))}
                    {Parameter(para).map((scale, idx) => (
                        <text y='40' x={widthEach * idx} style={{ fontFamily: 'TW Cen MT' }} key={scale.idx}>{scale.value}</text>
                    ))}
                </g>
            </svg>
        </div>)

}

export default ColorScale