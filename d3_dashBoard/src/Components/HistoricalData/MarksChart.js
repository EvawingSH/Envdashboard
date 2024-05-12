import { line, curveNatural, timeFormat, format } from 'd3'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Sensorinfo from '../Data/Sensorinfo.json'

const MarksChart = ({ AQIorWea, sensor, CompareSensor, binnedData, binnedData2, xScale, yScale, TooltipUnit }) => {

    const loc = Sensorinfo.features.filter((d) => {
        return d.name === sensor
    })
    
    if (!CompareSensor) {
        return (
            <g className='Chartmarks'>
                <rect x='180' y='-15' height='5' width='30' fill='#184872'></rect>
                <text x='220' y='-7' fill='#635F5D' style={{ fontSize: 18 }}>{AQIorWea===0?loc[0].Location:'Norwest Sales Office'}</text>
                <path
                    fill='none'
                    stroke='#184872'
                    strokeOpacity='80%'
                    style={{ strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' }}
                    d={line()
                        .defined(d => !isNaN(d.MeanData))
                        .curve(curveNatural)
                        .x(d => xScale(d.x0))
                        .y(d => yScale(d.MeanData))(binnedData)
                    } />
                {binnedData.map((d, idx) => {
                    if (!d.MeanData) {
                        return <></>
                    }
                    return (
                        <OverlayTrigger
                            key={idx}
                            placement='top'
                            delay={{ show: 50, hide: 50 }}
                            overlay={
                                <Tooltip id={d.x0} key={idx}>
                                    <h4> {format(".2f")(d.MeanData)} {TooltipUnit} </h4>
                                    <p>{timeFormat('%c')(d.x0)}</p>
                                </Tooltip>
                            }
                        >
                            <circle
                                fill='#184872'
                                key={idx}
                                cx={xScale(d.x0)}
                                cy={yScale(d.MeanData)}
                                r={2}
                            />
                        </OverlayTrigger>
                    )
                })
                }
            </g>
        )
    }else{
    const locCompare = Sensorinfo.features.filter((d) => {
        return d.name === CompareSensor
    })
    return (<g className='Chartmarks'>
        <rect x='10' y='-15' height='5' width='30' fill='#184872'></rect>
        <text x='50' y='-7' fill='#635F5D' style={{ fontSize: 18 }}>{AQIorWea===0?loc[0].Location:'Norwest Sales Office'}</text>
        <rect x='250' y='-15' height='5' width='30' fill='#FFC000'></rect>
        <text x='290' y='-7' fill='#635F5D' style={{ fontSize: 18 }}>{locCompare[0].Location}</text>
        <path
            fill='none'
            stroke='#184872'
            strokeOpacity='70%'
            style={{ strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' }}
            d={line()
                .defined(d => !isNaN(d.MeanData))
                .curve(curveNatural)
                .x(d => xScale(d.x0))
                .y(d => yScale(d.MeanData))(binnedData)
            } />
        {binnedData.map((d, idx) => {
            if (!d.MeanData) {
                return <></>
            }
            return (
                <OverlayTrigger
                    key={idx}
                    placement='top'
                    delay={{ show: 50, hide: 50 }}
                    overlay={
                        <Tooltip id={d.x0} key={idx}>
                            <h4> {d.MeanData} {TooltipUnit} </h4>
                            <p>{timeFormat('%c')(d.x0)}</p>
                        </Tooltip>
                    }
                >
                    <circle
                        fill='#184872'
                        key={idx}
                        cx={xScale(d.x0)}
                        cy={yScale(d.MeanData)}
                        r={2}
                    />
                </OverlayTrigger>
            )
        })
        }

        {/* Compare line */}
        <path
            fill='none'
            stroke='#FFC000'
            strokeOpacity='70%'
            style={{ strokeWidth: 3, strokeLinejoin: 'round', strokeLinecap: 'round' }}
            d={line()
                .defined(d => !isNaN(d.MeanData))
                .curve(curveNatural)
                .x(d => xScale(d.x0))
                .y(d => yScale(d.MeanData))(binnedData2)
            } />

        {binnedData2.map((d, idx) => {
            if (!d.MeanData) {
                return <></>
            }
            return (
                <OverlayTrigger
                    key={idx}
                    placement='top'
                    delay={{ show: 50, hide: 50 }}
                    overlay={
                        <Tooltip id={d.x0} key={idx}>
                            <h4> {d.MeanData} {TooltipUnit} </h4>
                            <p>{timeFormat('%c')(d.x0)}</p>
                        </Tooltip>
                    }>
                    <circle
                        fill='#FFC000'
                        fillOpacity='70%'
                        key={idx}
                        cx={xScale(d.x0)}
                        cy={yScale(d.MeanData)}
                        r={2}
                    />
                </OverlayTrigger>
            )
        })
        }
    </g>)}
}

export default MarksChart