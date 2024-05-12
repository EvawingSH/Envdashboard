import  { useState, useEffect} from 'react'
import axios from 'axios'
import {timeFormat } from 'd3'

//const sensor = 'snla1kb02'
//Get the time for Now, Time length is the date duration during which we would like to extract the data
//const Now = new Date(parseInt(Date.now()))

export const UseApiDataCompare = (sensor, SelectedMonth) => {
  //const sensor='snla1kb01'
  //output 8days raw data(data) for historical data and current data(dataNow) and data for comparison(dData)
  const [data, setData] = useState({
    data: null,
  });

  //Create an array for APIurls with different dates
    
  const TimeLength = 32
  const TimePeriod = []
  const Now=new Date()
  const Days=Now.getUTCDate()
   
  const MonthYear = timeFormat("%b %Y")(Now)
  const SelectedMonth1=timeFormat("%b %Y")(SelectedMonth)
  const APIurl = []

  //Create an array for APIurls with different dates
 if(SelectedMonth1===MonthYear){

  for (let j = Days - 1; j > -1; j--) {
   
    const Dates = new Date(Now.getTime() - (j * 24 * 60 * 60 * 1000))
    const Year = Dates.getFullYear()
    const Month = Dates.getUTCMonth() + 1 < 10 ? `0${Dates.getUTCMonth() + 1}` : `${Dates.getUTCMonth() + 1}`
    const Day = Dates.getUTCDate() < 10 ? `0${Dates.getUTCDate()}` : `${Dates.getUTCDate()}`
    TimePeriod.push(
      `${Year}-${Month}-${Day}`
    )
  }
  for (let i = 0; i < Days; i++) {
    APIurl.push(
      axios.get(
        `https://citysensors.be.unsw.edu.au/ttnv3/${sensor}/${TimePeriod[i]}/`,
        { headers: { 'Accept': 'application/json', 'type': 'ttn3', } }
      )
    )
  }
}else{
  for (let j = 0; j <TimeLength; j++) {
    // const Now = new Date()
    const Dates = new Date(SelectedMonth.getTime() + (j * 24 * 60 * 60 * 1000))
    const Year = Dates.getFullYear()
    const Month = Dates.getUTCMonth() + 1 < 10 ? `0${Dates.getUTCMonth() + 1}` : `${Dates.getUTCMonth() + 1}`
    const Day = Dates.getUTCDate() < 10 ? `0${Dates.getUTCDate()}` : `${Dates.getUTCDate()}`
    TimePeriod.push(
      `${Year}-${Month}-${Day}`
    )
  }
  for (let i = 0; i < TimeLength; i++) {
    APIurl.push(
      axios.get(
        `https://citysensors.be.unsw.edu.au/ttnv3/${sensor}/${TimePeriod[i]}/`,
        { headers: { 'Accept': 'application/json', 'type': 'ttn3', } }
      )
    )
  }
}
  
useEffect(() => {
    async function axiosGetData() {
      const res = await axios.all(APIurl)
      setData({
        data: res,
      })
    }
    axiosGetData()
},[sensor])

useEffect(() => {
  async function axiosGetData() {
    const res = await axios.all(APIurl)
    setData({
      data: res,
    })
  }
  axiosGetData()
},[SelectedMonth])
    
  return data
}
