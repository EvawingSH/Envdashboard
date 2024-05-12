import { Button,ButtonGroup} from 'react-bootstrap'


const HourDaySwitch = (props) => {
    const SwitchBar=[
        {name: 'Hourly', value:'Hourly'},
        {name: 'Daily', value: 'Daily'},
    ]

    return(
        <div style={{marginTop: 30}}>
        <svg width='190' height='50'>
        <text y='30' style={{ fontSize: 20 }}>Show the data</text>
    </svg>
    <ButtonGroup size='lg'>
        {SwitchBar.map((para,idx)=>(
            <Button
            key={idx}
            variant='outline-dark'
            value={para.value}
            onClick={(e)=>props.onSwitch(e.currentTarget.value)}
            style={{borderWidth: 2}} 
            size='md'
            >
                {para.name}
            </Button>
        ))}
     </ButtonGroup>
     </div>
    )
}

export default HourDaySwitch