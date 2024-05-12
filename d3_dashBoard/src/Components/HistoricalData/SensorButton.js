import React from 'react'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

const SensorButton= (props) => {

    return (
        <div>
            <ButtonGroup size='lg' style={{ marginTop: 20, fontFamily: 'TW Cen MT' }} >
                {props.SensorName.map((para, idx) => (
                    <Button
                        key={idx}
                        id={`radio-${idx}`}
                        variant='outline-primary'
                        name="radio"
                        value={para.value}
                        style={{ borderWidth: 2 }}
                        onClick={(e) => props.onClick(e.currentTarget.value)}
                    >
                        {para.name}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    )

}

export default SensorButton