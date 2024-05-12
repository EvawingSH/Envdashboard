import React from 'react'
import TimeRangeSlider from './TimeRangeSlider'
import LocationDropdownHis from './LocationDropHis'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'


const CompareandExplore = (props) => {


    const Dates = new Date()
    const ThisMonth = Dates.getUTCMonth()
    const ThisYear = Dates.getUTCFullYear()
    const MonthYear = new Date(ThisYear, ThisMonth, 1)


    const [Time, setTime] = useState(MonthYear)
    const [CompareSensor, setCompareSensor] = useState(props.activeSensor)


    return (

        <div style={{ marginTop: 30 }}>
            <TimeRangeSlider onChangeRange={(value) => setTime(value)} />
            <LocationDropdownHis activeSensor={props.activeSensor} onChangeSensor={(value) => setCompareSensor(value)} />
            <div style={{ marginBottom: 30 }}>
                <Button
                    size='lg'
                    variant='secondary'
                    style={{ borderWidth: 2, marginTop: 20 }}
                    onClick={() => props.onClickValueChange({
                        Range: Time,
                        CompareSensor: CompareSensor,
                        activeSensor: props.activeSensor
                    })}
                >
                    Click to Explore
                </Button>
            </div>
        </div>

    )

}

export default CompareandExplore
