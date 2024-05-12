import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Sensorinfo from '../Data/Sensorinfo.json'
import { Link } from 'react-router-dom'



const LocationDropdown = (props) => {
    
    return (
        <DropdownButton
            size='lg'
            variant="outline-dark"
            id="dropdown-basic"
            style={{ marginTop: 20, borderWidth: 2 }}
            title='Choose a Location'
            onSelect={(e)=>props.onSensorChange(e)}
        >
            {Sensorinfo.features.map(loc => (
                <Dropdown.Item key={loc.name} eventKey={loc.name} > 
                       <Link to={`/WeatherHeat/${loc.name}`}
                       style={{textDecoration:'none', color:'black'}}>    
                       {loc.Location} 
                       </Link>
                </Dropdown.Item>
            ))}
        </DropdownButton>

    )
}

export default LocationDropdown