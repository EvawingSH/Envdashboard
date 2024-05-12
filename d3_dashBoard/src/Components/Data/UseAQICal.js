import { useState, useEffect } from 'react'
import axios from 'axios'
import { timeHour, timeFormat, bin, max, mean, min, extent } from 'd3'



export const UseAQICal = (SelectedMonth) => {

    const [data, setData] = useState({
        Coef_O3: 0,
        Coef_NO2: 0,
        Coef_CO: 0
    });

    const TimeLength = 32
    const TimePeriod = []
    const Now = new Date()
    //   const Days=Now.getUTCDate()

    const MonthYear = timeFormat("%b %Y")(Now)
    const SelectedMonth1 = timeFormat("%b %Y")(SelectedMonth)
    const APIurl = []

    if (SelectedMonth1 === MonthYear) {

        for (let j = TimeLength - 1; j > -1; j--) {

            const Dates = new Date(Now.getTime() - (j * 24 * 60 * 60 * 1000))
            const Year = Dates.getFullYear()-1
            const Month = Dates.getUTCMonth() + 1 < 10 ? `0${Dates.getUTCMonth() + 1}` : `${Dates.getUTCMonth() + 1}`
            const Day = Dates.getUTCDate() < 10 ? `0${Dates.getUTCDate()}` : `${Dates.getUTCDate()}`
            TimePeriod.push(
                `${Year}-${Month}-${Day}`
            )
        }
        for (let i = 0; i < TimeLength; i++) {
            APIurl.push(
                axios.get(
                    `https://citysensors.be.unsw.edu.au/ttnv3/ems4a7c/${TimePeriod[i]}/`,
                    { headers: { 'Accept': 'application/json', 'type': 'ttn3', } }
                )
            )
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
                    `https://citysensors.be.unsw.edu.au/ttnv3/ems4a7c/${TimePeriod[i]}/`,
                    { headers: { 'Accept': 'application/json', 'type': 'ttn3', } }
                )
            )
        }
    }

    const CombinedData = (Predata, data) => {
        Predata.map(arr => data.push(...arr.data))
    }
    const AQIData1 = []
    const AQIData2 = []

    useEffect(() => {
        async function axiosGetData() {
            //request AQI data
            const res = await axios.all(APIurl)
            // console.log(res)
            //merge data for each day to a big matrix
            CombinedData(res, AQIData1)
            //arrange a dataframe with AQI and temp data
            for (let i = 0; i < AQIData1.length; i++) {
                AQIData2.push({
                    Time: AQIData1[i]['time'],
                    PM25: AQIData1[i]['pm25'],
                    PM10: AQIData1[i]['pm10'],
                    O3: AQIData1[i]['ozone'],
                    NO2: AQIData1[i]['nitrogendioxide'],
                    CO: AQIData1[i]['carbonmonoxide'],
                    temperature: AQIData1[i]['temperature'],
                })
            }
            //drop nan
            AQIData2.filter((d) => {
                return d.temperature !== NaN
            })
            
            //binned data based on temp
            const bin1 = bin()
                .value(d => +d.temperature)
                .domain(extent(AQIData2, d => +d.temperature))
                .thresholds(50)

            const binAQI = bin1(AQIData2)
                    
            const binnedO3 = []
            const binnedNO2=[]
            const binnedCO=[]
            const binnedTa=[]
     
            binAQI.map(array => {
                if(array[0]===undefined){}
                else if (array[0] !== undefined){
                    binnedTa.push(mean(array, d => +d.temperature))
                    binnedO3.push(min(array, d => +d.O3))
                    binnedNO2.push(min(array, d => +(d.NO2<0? d.NO2*-1: d.NO2)))
                    binnedCO.push(min(array, d => +(d.CO<0? d.CO*-1: d.CO)))
                    // binnedAQI.push({
                    //     MeanTa: mean(array, d => +d.temperature),
                    //     MinO3: min(array, d => +d.O3),
                    //     MinNO2: min(array, d => +d.NO2),
                    //     MinCO: min(array, d => +(d.CO*-1)),
                    // })
                }
            })
     
            //find fit curve for data
            // import
            const ExpReg = require('exponential-regression').ExpReg;

            // create dataset (5 values)
            const a = 0.1, b = 0.1, c = 0.1;
            const exp = t => a + b * Math.exp(c * t);
                        
            const yPre = binnedTa.map(exp);
          
            // make regression
            const Coef_O3 = ExpReg.solve(binnedO3, yPre);
            const Coef_NO2 = ExpReg.solve(binnedNO2, yPre);
            const Coef_CO = ExpReg.solve(binnedCO, yPre);
        
           
            setData({
                Coef_O3: Coef_O3,
                Coef_NO2: Coef_NO2,
                Coef_CO: Coef_CO
            })
        }
        axiosGetData()
    }, [])

    return data

}
