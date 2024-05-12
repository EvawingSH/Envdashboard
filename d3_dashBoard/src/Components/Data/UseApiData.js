import { useState, useEffect } from 'react'
import axios from 'axios'
import { timeHour, timeFormat } from 'd3'


//const sensor = 'snla1kb02'
//Get the time for Now, Time length is the date duration during which we would like to extract the data
//const Now = new Date(parseInt(Date.now()))

export const UseApiData = (Sen, SelectedMonth) => {
  // const sensor='snla1kb01'
  //output 8days raw data(data) for historical data and current data(dataNow) and data for comparison(dData)
  // const SelectdMonth='July 2022'
  const [data, setData] = useState({
    data: null,
    dataNow: null,
    AQIdata: null,
    dData: null
  });

  const TimeLength = 32
  const TimePeriod = []
  const Now = new Date()
  const Days = Now.getUTCDate()

  const MonthYear = timeFormat("%b %Y")(Now)
  const SelectedMonth1 = timeFormat("%b %Y")(SelectedMonth)
  const APIurl = []
  // console.log(SelectedMonth1)
  console.log(SelectedMonth1)


  //Create an array for APIurls with different dates
  if (SelectedMonth1 === MonthYear) {
    if (Days === 1) {
      for (let j = 1; j > -1; j--) {

        const Dates = new Date(Now.getTime() - (j * 24 * 60 * 60 * 1000))
        const Year = Dates.getFullYear()
        const Month = Dates.getUTCMonth() + 1 < 10 ? `0${Dates.getUTCMonth() + 1}` : `${Dates.getUTCMonth() + 1}`
        const Day = Dates.getUTCDate() < 10 ? `0${Dates.getUTCDate()}` : `${Dates.getUTCDate()}`
        TimePeriod.push(
          `${Year}-${Month}-${Day}`
        )
      }
      for (let i = 0; i < 2; i++) {
        APIurl.push(
          axios.get(
            `https://citysensors.be.unsw.edu.au/ttnv3/${Sen}/${TimePeriod[i]}/`,
            { headers: { 'Accept': 'application/json', 'type': 'ttn3', } }
          )
        )
      }
    } else if (Days > 1) {
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
            `https://citysensors.be.unsw.edu.au/ttnv3/${Sen}/${TimePeriod[i]}/`,
            { headers: { 'Accept': 'application/json', 'type': 'ttn3', } }
          )
        )
      }
    }
  } else {
    for (let j = 0; j < TimeLength; j++) {
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
          `https://citysensors.be.unsw.edu.au/ttnv3/${Sen}/${TimePeriod[i]}/`,
          { headers: { 'Accept': 'application/json', 'type': 'ttn3', } }
        )
      )
    }
  }
  //push AQI API to url
  const AQIAPIurl = []

  if (SelectedMonth1 === MonthYear) {
    if (Days === 1) {
      for (let i = 0; i < 2; i++) {
        AQIAPIurl.push(
          axios.get(
            `https://citysensors.be.unsw.edu.au/ttnv3/ems4a7c/${TimePeriod[i]}/`,
            { headers: { 'Accept': 'application/json', 'type': 'ttn3', } }
          )
        )
      }
    } else if (Days > 1) {
      for (let i = 0; i < Days; i++) {
        AQIAPIurl.push(
          axios.get(
            `https://citysensors.be.unsw.edu.au/ttnv3/ems4a7c/${TimePeriod[i]}/`,
            { headers: { 'Accept': 'application/json', 'type': 'ttn3', } }
          )
        )
      }
    }
  } else {
    for (let i = 0; i < TimeLength; i++) {
      AQIAPIurl.push(
        axios.get(
          `https://citysensors.be.unsw.edu.au/ttnv3/ems4a7c/${TimePeriod[i]}/`,
          { headers: { 'Accept': 'application/json', 'type': 'ttn3', } }
        )
      )
    }
  }

  useEffect(() => {
    async function axiosGetData() {
      const res = await axios.all(APIurl)
      const predataToday = res[res.length - 1].data
      const predataYesterday = res[res.length - 2].data
      const predataTwo = [...predataYesterday, ...predataToday]
      const dataCalc = () => {
        if (!predataTwo[0]) {

          const dataNow = 'The sensor is currently not working.'
          const dData = 'The sensor is currently not working.'
          return { dataNow, dData }
        } else if (predataTwo[0]) {

          const dataNow = predataTwo[predataTwo.length - 1]
          const HourYes = new Date(timeHour.offset(new Date(dataNow.time), -24))
          const datafiltered = predataTwo.filter((d) => {
            return new Date(d.time).getTime() >= HourYes.getTime()
          })
          const dataYesterday = datafiltered[0]
          const dData = {
            dTemp: +(dataNow.airtemperature - dataYesterday.airtemperature),
            dHumidity: +(dataNow.relativehumidity - dataYesterday.relativehumidity),
            dRain: +(dataNow.precipitation - dataYesterday.precipitation),
            dWind: +(dataNow.windspeed - dataYesterday.windspeed),
            dSolar: Sen==='mulphaict'?+(dataNow.solar - dataYesterday.solar):+(dataNow.solarradiation - dataYesterday.solarradiation),
          }
          return { dataNow, dataYesterday, dData }
        }
      }

      const resAQI = await axios.all(AQIAPIurl)
     
      setData({
        data: res,
        dataNow: dataCalc().dataNow,
        AQIdata: resAQI,
        dData: dataCalc().dData
      })

    }
    axiosGetData()
  }, [SelectedMonth])

  useEffect(() => {
    async function axiosGetData() {
      const res = await axios.all(APIurl)
      const predataToday = res[res.length - 1].data
      const predataYesterday = res[res.length - 2].data
      const predataTwo = [...predataYesterday, ...predataToday]

      const dataCalc = () => {
        if (!predataTwo[0]) {

          const dataNow = 'The sensor is currently not working.'
          const dData = 'The sensor is currently not working.'
          return { dataNow, dData }
        } else if (predataTwo[0]) {

          const dataNow = predataTwo[predataTwo.length - 1]
          const HourYes = new Date(timeHour.offset(new Date(dataNow.time), -24))
          const datafiltered = predataTwo.filter((d) => {
            return new Date(d.time).getTime() >= HourYes.getTime()
          })
          const dataYesterday = datafiltered[0]
          const dData = {
            dTemp: +(dataNow.airtemperature - dataYesterday.airtemperature),
            dHumidity: +(dataNow.relativehumidity - dataYesterday.relativehumidity),
            dRain: +(dataNow.precipitation - dataYesterday.precipitation),
            dWind: +(dataNow.windspeed - dataYesterday.windspeed),
            dSolar: dataNow.solarradiation? +(dataNow.solarradiation - dataYesterday.solarradiation) : +(dataNow.solar - dataYesterday.solar),
          }
          return { dataNow, dataYesterday, dData }
        }
      }

      const resAQI = await axios.all(AQIAPIurl)

      setData({
        data: res,
        dataNow: dataCalc().dataNow,
        AQIdata: resAQI,
        dData: dataCalc().dData
      })

    }
    axiosGetData()
  }, [Sen])

  return data
}
