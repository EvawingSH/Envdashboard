import {timeFormat} from 'd3'

const yAxisLabel = (ActivePara) => {
    if (ActivePara === 'Temp') {
        return ['Temperature (°C)', '°C']
    } else if (ActivePara === 'Humidity') {
        return ['Humidity (%)', '%']
    } else if (ActivePara === 'Rain') {
        return ['Rain (mm/h)', 'mm/h']
    } else if (ActivePara === 'Wind') {
        return ['Wind (km/h)', 'km/h']
    } else if (ActivePara === 'Solar') {
        return ['Solar (kW/m²)', 'kW/m²']
    } else if (ActivePara === 'PM2.5') {
        return ['PM2.5 (μg/m³)', 'μg/m³']
    } else if (ActivePara === 'PM10') {
        return ['PM10 (μg/m³)', 'μg/m³']
    } else if (ActivePara === 'O₃') {
        return ['O₃ (pphm)', 'pphm']
    } else if (ActivePara === 'NO₂') {
        return ['NO₂ (pphm)', 'pphm']
    } else if (ActivePara === 'CO') {
        return ['CO (ppm)', 'ppm']
    }
}


const SensorName = (name) => {
    if (name === "snla1kb01") {
        return "Lindenwood Estate"
    } else if (name === "snla1kb02") {
        return "Mulpha Vacant Lot"
    } else if (name === "snla1kb03") {
        return "Lexington Drv Woolworths"
    } else if (name === "snla1kb04") {
        return "Circa Retail"
    } else if (name === "snla1kb05") {
        return "Norwest Main Lake"
    } else if (name === "snla1kb06") {
        return "Essentia Vacant Lot"
    } else if (name === "snla1kb07") {
        return "Zhen building"
    } else if (name === "snla1kb08") {
        return "Edgewater Dr Creek"
    } else if (name === "snla1kb09") {
        return "Detention Basin"
    }else if (name === "mulphaict") {
        return "Norwest Marketown"
    }else if (name === "snla1kb0a") {
        return "The Greens by Norwest"
    }
}


const yValue = (sensor, ActivePara, d) => {
    if (ActivePara === 'Temp') {
        return d=>+d.airtemperature
    } else if (ActivePara === 'Humidity') {
        return d=>+d.relativehumidity
    } else if (ActivePara === 'Rain') {
        return d=>+d.precipitation
    } else if (ActivePara === 'Wind') {
        return d=>+d.windspeed
    } else if (ActivePara === 'Solar') {
        if(sensor!=='mulphaict'){
        return d=>+d.solarradiation / 1000}
        else {
        return d=>+d.solar/1000
        }
    } else if (ActivePara === 'PM2.5') {
        return d=>+d.pm25
    } else if (ActivePara === 'PM10') {
        return d=>+d.pm10
    } else if (ActivePara === 'O₃') {
        return d=>+(d.ozone)  
    } else if (ActivePara === 'NO₂') {
        return d=>+(d.nitrogendioxide)
    } else if (ActivePara === 'CO') {
        return d=>+(d.carbonmonoxide*-1)
    }
}

const xAxisTickFormat = (tickLength, d) => {
    if (tickLength > 14) {
        return [timeFormat('%b %d')(d)]
    } else if (tickLength < 15) {
        return [timeFormat('%b %d')(d), timeFormat('%H %p')(d)]
    }
}



export {yAxisLabel, SensorName, yValue, xAxisTickFormat}