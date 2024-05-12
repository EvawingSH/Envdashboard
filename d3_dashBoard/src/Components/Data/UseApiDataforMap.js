import { useState, useEffect } from 'react'
import axios from 'axios'
import * as Sensorinfo from "./Sensorinfo.json"
import {median} from 'd3'



export const UseApiDataforMap = () => {

  //output current data for all sensors
  const [data, setData] = useState(null)

  //Create an array for APIurls with different dates

  // const preDates = new Date()
  // const Dates=preDates.getDate()>preDates.getUTCDate()? new Date(timeDay.offset(preDates, -1)): preDates
  const TimeCurrent=[]
  const TimeLength=2
  for (let j = TimeLength - 1; j > -1; j--) {
    const Now = new Date()
    const Dates = new Date(Now.getTime() - (j * 24 * 60 * 60 * 1000))
    const Year = Dates.getFullYear()-1
    const Month = Dates.getUTCMonth() + 1 < 10 ? `0${Dates.getUTCMonth() + 1}` : `${Dates.getUTCMonth() + 1}`
    const Day = Dates.getUTCDate() < 10 ? `0${Dates.getUTCDate()}` : `${Dates.getUTCDate()}`
    TimeCurrent.push(
      `${Year}-${Month}-${Day}`
    )
  }
  
  const APIurl = []
  
   for (let i = 0; i < Sensorinfo.features.length; i++) {
    APIurl.push(
      axios.get(
        `https://citysensors.be.unsw.edu.au/ttnv3/${Sensorinfo.features[i].name}/${TimeCurrent[0]}/`,
        { headers: { 'Accept': 'application/json', 'type': 'ttn3', } }
      )
    )
  }

  for (let i = 0; i < Sensorinfo.features.length; i++) {
    APIurl.push(
      axios.get(
        `https://citysensors.be.unsw.edu.au/ttnv3/${Sensorinfo.features[i].name}/${TimeCurrent[1]}/`,
        { headers: { 'Accept': 'application/json', 'type': 'ttn3', } }
      )
    )
  }

 
  useEffect(() => {
    async function axiosGetData() {
      const res = await axios.all(APIurl)
   
      const dLength= []
      const preData=[]
      const preRes=[]
      const preTemp=[]
      const preHum=[]
      for(let y=0; y<res.length/2; y++){
        preRes.push([...res[y].data,...res[y+(res.length/2)].data])
      }
      
      for (let j = 0; j < preRes.length; j++) {
        dLength.push( preRes[j].length-1)
      }
   
      for (let z = 0; z < preRes.length; z++) {
        if(dLength[z]<1){
          preTemp.push(NaN)
          preHum.push(NaN)
        }else{
        preTemp.push( preRes[z][dLength[z]].airtemperature)
        preHum.push( preRes[z][dLength[z]].relativehumidity)
        }
      }

      const MedianTemp=median(preTemp)
      const MedianHum=median(preHum)

      for(let x=0;x<res.length/2;x++){

            preData.push({
              name: Sensorinfo.features[x].name,
              Lat: Sensorinfo.features[x].Lat,
              Lon: Sensorinfo.features[x].Lon,
              Location: Sensorinfo.features[x].Location,
              MedianTemp: MedianTemp,
              MedianHum: MedianHum,
              data: preRes[x].length===0||!preRes[x].length? {             
              }
               :
              {
                airtemperature: preRes[x][dLength[x]].airtemperature,
                relativehumidity:preRes[x][dLength[x]].relativehumidity,
                TemptoMedian:preRes[x][dLength[x]].airtemperature-MedianTemp,
                HumtoMedian:preRes[x][dLength[x]].relativehumidity-MedianHum,
                precipitation:preRes[x][dLength[x]].precipitation,
                windspeed:preRes[x][dLength[x]].windspeed,
                solarradiation:preRes[x][dLength[x]].solarradiation? preRes[x][dLength[x]].solarradiation : preRes[x][dLength[x]].solar,
                winddirection:preRes[x][dLength[x]].winddirection,
                time:preRes[x][dLength[x]].time
              }
           })
       }   
      setData(preData)
    }
      axiosGetData()
    }, [])

  return data
}
