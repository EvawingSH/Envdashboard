import { useState, useEffect } from 'react'
import axios from 'axios'

export const UseUVApi = () => {
    const [UV, setUV] = useState([])

    const UVurl = "https://liverpool-city-council-westernparklands.opendatasoft.com/api/records/1.0/search/?dataset=environmental-sensors&q=&sort=metadata_time&facet=device_name&facet=metadata_time&facet=dev_id&apikey=b7c750bbeea584ec9032a9120b3a8d4c403718bd9c68973bbd62390d"

    useEffect(() => {
        async function axiosGetUV() {
            const res = await axios.get(
                UVurl, { headers: { 'Accept': 'application/json' } }
            )
            const data = res.data.records
            
            const UVdata = []
            for (let i = 0; i < data.length; i++) {
                UVdata.push({ Time: data[i].fields.record_timestamp, Location: data[i].fields.device_name, UV: data[i].fields.payload_fields_uvindex })
            }
            // console.log(UVdata)
            const UVdata_Mac = UVdata.filter((d) => {
                return d.Location === "Environmental monitoring - Macquarie Mall"
            })
            // console.log(UVdata_Mac)
            const UVdata_Mac_reads = UVdata_Mac.filter((d) => {
                return d.UV !== undefined
            })
            // console.log(UVdata_Mac_reads)
            setUV(UVdata_Mac_reads[0]['UV'])
        }
        axiosGetUV()

    }, [])

    return UV
}