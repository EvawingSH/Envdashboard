import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'


const ParameterBar = (props) => {
    const ParameterBar = [
        { name: 'Temperature', value: 'Temp' },
        { name: 'Humidity', value: 'Humidity' },
        { name: 'Rain', value: 'Rain' },
        { name: 'Wind', value: 'Wind' },
        { name: 'Solar Radiation', value: 'Solar' },
    ]

    return (
        <div style={{marginTop: 20}}>
        {/* <p>You can switch environmental measurments using the navigation bar. </p> */}
        <ButtonGroup size='lg' style={{ marginTop: 0}} className='mb-2' type='checkbox'>
            {ParameterBar.map((para, idx) => (
                <Button
                    key={idx}
                    id={`radio-${idx}`}
                    variant='outline-dark'
                    name="radio"
                    value={para.value}
                    style={{borderWidth: 2}}
                    onClick={(e) => props.onClick(e.currentTarget.value)}
                >
                    {para.name}
                </Button>
            ))}
        </ButtonGroup>
        </div>)
}

export default ParameterBar