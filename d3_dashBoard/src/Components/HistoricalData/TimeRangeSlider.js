import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box';
import { timeMonth, timeFormat } from 'd3'
import { styled } from '@mui/material/styles';


const Months = 12
const Timeperiod = []

for (let i = Months; i > -1; i--) {
    const Now = new Date()
    const Dates = new Date(timeMonth.offset(Now, -i))
    const MonthYear = timeFormat('%b %Y')(Dates)
    const Month=Dates.getUTCMonth()
    const FullYear=Dates.getUTCFullYear()
    const NewDates=new Date(FullYear, Month, 1)
    Timeperiod.push(
       {label: MonthYear, Dates: NewDates}
    )
}


const earliestTime = new Date(2021, 6)


const Timefiltered = Timeperiod.filter((d) => {
    return new Date(d.Dates).getTime() >= earliestTime.getTime()
})


for (let i=0; i<Timefiltered.length; i++){
    Object.assign(Timefiltered[i],{value: i})
}


const TimeMarks = () => {
    if (Timefiltered.length === 13) {
        return [Timefiltered[0], Timefiltered[3], Timefiltered[6], Timefiltered[9], Timefiltered[12]]
    } else if (Timefiltered.length === 12) {
        return [Timefiltered[0], Timefiltered[3], Timefiltered[6], Timefiltered[9], Timefiltered[11]]
    } else if (Timefiltered.length === 11) {
        return [Timefiltered[0], Timefiltered[2], Timefiltered[4], Timefiltered[6], Timefiltered[8], Timefiltered[10]]
    }else if (Timefiltered.length === 10) {
        return [Timefiltered[0], Timefiltered[2], Timefiltered[4], Timefiltered[6], Timefiltered[9]]
    }else if (Timefiltered.length === 9) {
        return [Timefiltered[0], Timefiltered[2], Timefiltered[4], Timefiltered[6], Timefiltered[8]]
    }else if (Timefiltered.length === 8) {
        return [Timefiltered[0], Timefiltered[2], Timefiltered[3], Timefiltered[5], Timefiltered[7]]
    }else if (Timefiltered.length === 7) {
        return [Timefiltered[0], Timefiltered[1], Timefiltered[3], Timefiltered[4], Timefiltered[5],Timefiltered[6]]
    }else if (Timefiltered.length === 6) {
        return [Timefiltered[0], Timefiltered[1], Timefiltered[2], Timefiltered[3], Timefiltered[4],Timefiltered[5]]
}else if (Timefiltered.length === 5) {
    return [Timefiltered[0], Timefiltered[1], Timefiltered[2], Timefiltered[3], Timefiltered[4]]
}else if (Timefiltered.length === 4) {
    return [Timefiltered[0], Timefiltered[1], Timefiltered[2], Timefiltered[3]]
}
}

const PrettoSlider = styled(Slider)({
    color: '#184872',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '3px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 55,
      height: 55,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#184872',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });


const TimeRangeSlider = (props) => {


    return (
        <Box sx={{ width: 620 }} style={{ marginLeft: 30, marginTop:20 }}>
            <h4 style={{marginLeft: -30, fontSize: 20}}>Show the data for</h4>
            <PrettoSlider
                aria-label='Time'
                onChange={(e) => props.onChangeRange(Timefiltered[e.target.value]['Dates'])}
                defaultValue={Timefiltered.length}
                valueLabelDisplay="on"
                valueLabelFormat={(value)=>Timefiltered[value]['label']}
                getAriaValueText={(value)=>Timefiltered[value]['label']}
                step={1}
                marks={TimeMarks()}
                min={0}
                max={Timefiltered.length-1}
                track={false}
            />
        </Box>

    )
}

export default TimeRangeSlider