import { useState, useEffect } from 'react'
import axios from 'axios'
import { format, timeHour, mean } from 'd3'
import * as d3 from 'd3'

const Sensor1 = 'snla1kb01'
const Sensor2 = 'snla1kb02'
const SensorAQI = 'ems4a7c'

const Cal_AQI = (a, b, c, AQI, Ta) => {
    return AQI - (a + b * Math.exp(c * Ta))
}

export const UseDataforOverview = () => {

    //output the average readings for two weather stations: sensor1 and 2, and the processed AQI data
    //(PM25-24hours, PM10-24hours, CO-8hours, NO2-1hour, Ozone-8hours)
    const [data, setData] = useState({
        Weather: { "Temp": 0, "Hum": 0, "WS": 0, "Solar": 20 },
        AQI: { "PM25": 0, "PM10": 0, "O3": 0, "NO2": 0, "CO": 0 },
        dAQI: { "dPM25": 0, "dPM10": 0, "dO3": 0, "dNO2": 0, "dCO": 0 },
        // Temp:{"Temp_24": 0, "Temp_8": 0, "Temp_1": 0, "TempYes_24": 0, "TempYes_8": 0, "TempYes_1": 0}
    })
   
    //calculated coeff using last 30 days data
    // const Coeff = UseAQICal(selectedMonth)
    // console.log(Coeff)
    //fixed Coeff based on data from Sep 2021~Jan 2022
   const Coeff={
        Coef_O3:{a: -3.562321823967782, b: 3.5236921806897428, c: 0.01177654772658368},
        Coef_NO2:{a: 0.8666518739875384, b: 1.8539100057461932, c: 0.01586594600120021},
        Coef_CO:{a: 6.123926029885666, b: -2.8517568080418583, c: 0.00024842180618219313}
     }

    const TimeLength = 3
    const TimePeriod = []

    //Create an array for APIurls with different dates
    for (let j = TimeLength - 1; j > -1; j--) {
        const Now = new Date()
        const Dates = new Date(Now.getTime() - (j * 24 * 60 * 60 * 1000))
        const Year = Dates.getFullYear()-1
        const Month = Dates.getUTCMonth() + 1 < 10 ? `0${Dates.getUTCMonth() + 1}` : `${Dates.getUTCMonth() + 1}`
        const Day = Dates.getUTCDate() < 10 ? `0${Dates.getUTCDate()}` : `${Dates.getUTCDate()}`
        TimePeriod.push(
            `${Year}-${Month}-${Day}`
        )
    }

    const headers = { 'Accept': 'application/json', 'type': 'ttn3', }

    //Timeperiod is changed for testing, remeber to change it back after testing 
    const Sensor1API1 = axios.get(`https://citysensors.be.unsw.edu.au/ttnv3/${Sensor1}/${TimePeriod[1]}/`, { headers })
    const Sensor1API2 = axios.get(`https://citysensors.be.unsw.edu.au/ttnv3/${Sensor1}/${TimePeriod[2]}/`, { headers })
    const Sensor2API1 = axios.get(`https://citysensors.be.unsw.edu.au/ttnv3/${Sensor2}/${TimePeriod[1]}/`, { headers })
    const Sensor2API2 = axios.get(`https://citysensors.be.unsw.edu.au/ttnv3/${Sensor2}/${TimePeriod[2]}/`, { headers })
    const SensorAQI1 = axios.get(`https://citysensors.be.unsw.edu.au/ttnv3/${SensorAQI}/${TimePeriod[0]}/`, { headers })
    const SensorAQI2 = axios.get(`https://citysensors.be.unsw.edu.au/ttnv3/${SensorAQI}/${TimePeriod[1]}/`, { headers })
    const SensorAQI3 = axios.get(`https://citysensors.be.unsw.edu.au/ttnv3/${SensorAQI}/${TimePeriod[2]}/`, { headers })
    // const SensorAQI1 = axios.get(`https://citysensors.be.unsw.edu.au/ttnv3/${SensorAQI}/2021-11-27/`, { headers })
    // const SensorAQI2 = axios.get(`https://citysensors.be.unsw.edu.au/ttnv3/${SensorAQI}/2021-11-28/`, { headers })
    // const SensorAQI3 = axios.get(`https://citysensors.be.unsw.edu.au/ttnv3/${SensorAQI}/2021-11-29/`, { headers })

    useEffect(() => {
        async function axiosGetData() {
            const res = await axios.all([Sensor1API1, Sensor1API2, Sensor2API1, Sensor2API2, SensorAQI1, SensorAQI2, SensorAQI3])
            const Sensor1Data = [...res[0].data, ...res[1].data]
            const Length1 = Sensor1Data.length
            const Sensor2Data = [...res[2].data, ...res[3].data]
            const Length2 = Sensor2Data.length
            const Weather1 = Sensor1Data[Length1 - 1]
            const Weather2 = Sensor2Data[Length2 - 1]
            const Temp = (+(Weather2.airtemperature) + (+(Weather1.airtemperature))) / 2
            const Hum = (+(Weather2.relativehumidity) + (+(Weather1.relativehumidity))) / 2
            const preWS = (+(Weather2.windspeed) + (+(Weather1.windspeed))) * 1000 / (3600 * 2)
            const WScalc = () => {
                if (preWS < 0.5) {
                    return 0.5
                } else if (preWS > 0.5 & preWS < 18) {
                    return preWS
                } else if (preWS > 17) {
                    return 17
                }
            }
            const Pretime = new Date(Weather2.time)
            const TiFormat = d3.timeFormat('%Y/%m/%d %H:%M:%S')
            const time = TiFormat(Pretime)
            // console.log(Weather2)
            const WS = WScalc()
            const Solar = (+(Weather2.solarradiation) + (+(Weather1.solarradiation))) / 2

            //arrange the AQI data 
            //(PM25-24hours, PM10-24hours, CO-8hours, NO2-1hour, Ozone-8hours)
            const AQIall = [...res[4].data, ...res[5].data, ...res[6].data]
            const AQINow = new Date(AQIall[AQIall.length - 1].time)
            const Hour_1 = new Date(timeHour.offset(AQINow, -1))
            //const Hour_4=new Date(timeHour.offset(AQINow, -4))
            const Hour_8 = new Date(timeHour.offset(AQINow, -8))
            const Hour_24 = new Date(timeHour.offset(AQINow, -24))
            const HourYes_1 = new Date(timeHour.offset(Hour_24, -1))
            const HourYes_8 = new Date(timeHour.offset(Hour_24, -8))
            const HourYes_24 = new Date(timeHour.offset(Hour_24, -24))
            const Data_24 = AQIall.filter((d) => {
                return new Date(d.time).getTime() >= Hour_24.getTime()
            })
            const Data_1 = AQIall.filter((d) => {
                return new Date(d.time).getTime() >= Hour_1.getTime()
            })
            const Data_8 = AQIall.filter((d) => {
                return new Date(d.time).getTime() >= Hour_8.getTime()
            })

            const DataYes_24 = AQIall.filter((d) => {

                return new Date(d.time).getTime() >= HourYes_24.getTime() & new Date(d.time).getTime() <= Hour_24.getTime()
            })
            const DataYes_8 = AQIall.filter((d) => {
                return new Date(d.time).getTime() >= HourYes_8.getTime() & new Date(d.time).getTime() <= Hour_24.getTime()
            })
            const DataYes_1 = AQIall.filter((d) => {
                return new Date(d.time).getTime() >= HourYes_1.getTime() & new Date(d.time).getTime() <= Hour_24.getTime()
            })

            const PM25 = format('.2f')(mean(Data_24, d => +d.pm25))
            const PM10 = format('.2f')(mean(Data_24, d => +d.pm10))
            const dPM25 = PM25 - mean(DataYes_24, d => +d.pm25)
            const dPM10 = PM10 - mean(DataYes_24, d => +d.pm10)

            //units ppb=>ppm    1ppm=1000ppb 1ppm=100pphm
            const O3 = format('.2f')(mean(Data_8, d => d.ozone))
            const Temp_8 = format('.2f')(mean(Data_8, d => d.temperature))
            const TempYes_8 = format('.2f')(mean(DataYes_8, d => d.temperature))
            const O3Yes = format('.2f')(mean(DataYes_8, d => d.ozone))
            const O3NowCal = Cal_AQI(Coeff.Coef_O3.a, Coeff.Coef_O3.b, Coeff.Coef_O3.c, O3, Temp_8) / 1000
            const O3YesCal = Cal_AQI(Coeff.Coef_O3.a, Coeff.Coef_O3.b, Coeff.Coef_O3.c, O3Yes, TempYes_8) / 1000
            const dO3 = O3NowCal - O3YesCal


            //units ppb
            const preNO2 = mean(Data_1, d => +d.nitrogendioxide)
            const Temp_1 = format('.2f')(mean(Data_1, d => d.temperature))
            const TempYes_1 = format('.2f')(mean(DataYes_1, d => d.temperature))
            const NO2 = preNO2 > 0 ? format('.2f')(preNO2) : format('.2f')(preNO2 * -1)
            // console.log(NO2)
            const preNO2yes = mean(DataYes_1, d => d.nitrogendioxide)
            const NO2Yes = preNO2yes > 0 ? format('.2f')(preNO2yes) : format('.2f')(preNO2yes * -1)
            const NO2NowCal = Cal_AQI(Coeff.Coef_NO2.a, Coeff.Coef_NO2.b, Coeff.Coef_NO2.c, NO2, Temp_1)
            const NO2YesCal = Cal_AQI(Coeff.Coef_NO2.a, Coeff.Coef_NO2.b, Coeff.Coef_NO2.c, NO2Yes, TempYes_1)
            const dNO2 = NO2NowCal - NO2YesCal
            // console.log(NO2NowCal)

            //units ppb=>ppm
            const CO = mean(Data_8, d => d.carbonmonoxide)<0? format('.2f')(mean(Data_8, d => d.carbonmonoxide) * -1):format('.2f')(mean(Data_8, d => d.carbonmonoxide))
            // console.log(CO)
            const COYes = mean(DataYes_8, d => d.carbonmonoxide)<0? format('.2f')(mean(DataYes_8, d => d.carbonmonoxide) * -1):format('.2f')(mean(DataYes_8, d => d.carbonmonoxide))
            const CONowCal = (Cal_AQI(Coeff.Coef_CO.a, Coeff.Coef_CO.b, Coeff.Coef_CO.c, CO, Temp_8)) / 1000
            const COYesCal = (Cal_AQI(Coeff.Coef_CO.a, Coeff.Coef_CO.b, Coeff.Coef_CO.c, COYes, TempYes_8)) / 1000
            const dCO = CONowCal - COYesCal
            // console.log(CONowCal)
            setData({
                Weather: { "Temp": +format('.2f')(Temp), "Hum": +format('.2f')(Hum), "WS": +format('.2f')(WS), "Solar": +format('.2f')(Solar), "time": time },
                AQI: { "PM25": +PM25, "PM10": +PM10, "O3": +O3NowCal, "NO2": +NO2NowCal, "CO": +CONowCal },
                dAQI: { "dPM25": +dPM25, "dPM10": +dPM10, "dO3": +dO3, "dNO2": dNO2, "dCO": dCO },
                // Temp:{"Temp_8": Temp_8, "Temp_1": Temp_1, "TempYes_8": TempYes_8, "TempYes_1": TempYes_1}
            })

        }
        axiosGetData()

    }, [])

    return data

}